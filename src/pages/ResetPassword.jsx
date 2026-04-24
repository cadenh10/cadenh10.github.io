import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

/**
 * Supabase sends recovery links in one of a few shapes depending on the project's
 * auth flow type. This page handles all of them without requiring the user to
 * already be signed in:
 *
 *   1. PKCE flow:          /auth/reset-password?code=<code>
 *   2. Token-hash flow:    /auth/reset-password?token_hash=<hash>&type=recovery
 *   3. Implicit (legacy):  /auth/reset-password#access_token=...&type=recovery
 *
 * In (3) the Supabase client auto-detects the fragment and emits a
 * PASSWORD_RECOVERY auth event. In (1) and (2) we must exchange the token
 * ourselves before the session is usable.
 */

const STATUS = {
  VERIFYING: "verifying",
  READY: "ready",
  SUBMITTING: "submitting",
  SUCCESS: "success",
  EXPIRED: "expired",
  UNCONFIGURED: "unconfigured",
};

function getRecoveryParams() {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(
    window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash
  );
  return {
    code: query.get("code"),
    tokenHash: query.get("token_hash"),
    type: query.get("type") || hash.get("type"),
    accessToken: hash.get("access_token"),
    refreshToken: hash.get("refresh_token"),
    error: query.get("error") || hash.get("error"),
    errorCode: query.get("error_code") || hash.get("error_code"),
    errorDescription:
      query.get("error_description") || hash.get("error_description"),
  };
}

function validatePassword(pw) {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter.";
  if (!/[0-9]/.test(pw)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(pw))
    return "Password must include a special character.";
  return null;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(
    isSupabaseConfigured() ? STATUS.VERIFYING : STATUS.UNCONFIGURED
  );
  const [flowError, setFlowError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    const finalize = (next, errorMsg = null) => {
      if (cancelled) return;
      setStatus(next);
      setFlowError(errorMsg);
    };

    const initialize = async () => {
      console.info("[ResetPassword] reset page loaded");
      const {
        code,
        tokenHash,
        type,
        accessToken,
        refreshToken,
        error,
        errorCode,
        errorDescription,
      } = getRecoveryParams();

      if (error || errorCode || errorDescription) {
        console.info("[ResetPassword] error link detected");
        const decoded = errorDescription ? decodeURIComponent(errorDescription) : "";
        const friendlyMessage =
          errorCode === "otp_expired" ? "Reset link expired" : decoded || "Invalid reset link.";
        finalize(STATUS.EXPIRED, friendlyMessage);
        return;
      }

      try {
        if (type === "recovery" && accessToken && refreshToken) {
          console.info("[ResetPassword] recovery link detected");
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setSessionError) throw setSessionError;

          const cleanUrl = `${window.location.pathname}${window.location.search}`;
          window.history.replaceState({}, document.title, cleanUrl);
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash && type === "recovery") {
          console.info("[ResetPassword] recovery link detected");
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });
          if (error) throw error;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          finalize(STATUS.READY);
          return;
        }

        // No session yet. The hash-based flow resolves asynchronously via
        // detectSessionInUrl; give it a short grace period, then give up.
        setTimeout(async () => {
          if (cancelled) return;
          const { data: retry } = await supabase.auth.getSession();
          if (retry.session) {
            finalize(STATUS.READY);
          } else {
            finalize(STATUS.EXPIRED);
          }
        }, 800);
      } catch (err) {
        finalize(STATUS.EXPIRED, err?.message || null);
      }
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (cancelled) return;
        if (event === "PASSWORD_RECOVERY" && session) {
          finalize(STATUS.READY);
        }
      }
    );

    return () => {
      cancelled = true;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const passwordIssue = useMemo(
    () => (password ? validatePassword(password) : null),
    [password]
  );
  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;
  const canSubmit =
    status === STATUS.READY &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !passwordIssue &&
    passwordsMatch;

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!supabase) return;

      setFormError(null);

      const issue = validatePassword(password);
      if (issue) {
        setFormError(issue);
        return;
      }
      if (password !== confirmPassword) {
        setFormError("Passwords do not match.");
        return;
      }

      setStatus(STATUS.SUBMITTING);
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setStatus(STATUS.READY);
        setFormError(error.message || "Could not update password.");
        return;
      }

      try {
        await supabase.auth.signOut();
      } catch {
        // Non-fatal: the user can still sign in again from the app.
      }
      setStatus(STATUS.SUCCESS);
    },
    [password, confirmPassword]
  );

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center px-6 py-16 md:py-20">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-emerald-500/90 transition-colors hover:text-emerald-400"
          >
            ← Back to Dialed
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-[0_28px_90px_-32px_rgba(0,0,0,0.9)] md:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Set new password
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Choose a new password for your Dialed account.
          </p>

          <div className="mt-8">
            {status === STATUS.UNCONFIGURED && (
              <UnconfiguredState />
            )}

            {status === STATUS.VERIFYING && <VerifyingState />}

            {status === STATUS.EXPIRED && <ExpiredState message={flowError} />}

            {status === STATUS.SUCCESS && (
              <SuccessState onReturn={() => navigate("/")} />
            )}

            {(status === STATUS.READY || status === STATUS.SUBMITTING) && (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <Field
                  id="new-password"
                  label="New password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  disabled={status === STATUS.SUBMITTING}
                />

                <Field
                  id="confirm-password"
                  label="Confirm password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  disabled={status === STATUS.SUBMITTING}
                  error={
                    confirmPassword.length > 0 && !passwordsMatch
                      ? "Passwords do not match."
                      : null
                  }
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex cursor-pointer select-none items-center gap-2 text-xs text-zinc-400">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="h-3.5 w-3.5 cursor-pointer accent-emerald-500"
                    />
                    Show password
                  </label>

                  <PasswordStrength password={password} />
                </div>

                <ul className="space-y-1 rounded-md border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-500">
                  <Rule ok={password.length >= 8} text="At least 8 characters" />
                  <Rule ok={/[A-Z]/.test(password)} text="One uppercase letter" />
                  <Rule ok={/[a-z]/.test(password)} text="One lowercase letter" />
                  <Rule ok={/[0-9]/.test(password)} text="One number" />
                  <Rule
                    ok={/[^A-Za-z0-9]/.test(password)}
                    text="One special character"
                  />
                </ul>

                {formError && (
                  <p
                    role="alert"
                    className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit || status === STATUS.SUBMITTING}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-600/30 disabled:text-black/60"
                >
                  {status === STATUS.SUBMITTING
                    ? "Updating…"
                    : "Update password"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Having trouble?{" "}
          <a
            href="mailto:workdialed@gmail.com"
            className="text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
          >
            workdialed@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  placeholder,
  disabled,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-400"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full rounded-md border bg-zinc-900/80 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors disabled:opacity-60 ${
          error
            ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/40"
            : "border-zinc-700 focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/40"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Rule({ ok, text }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden
        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold ${
          ok
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-white/5 text-zinc-500"
        }`}
      >
        {ok ? "✓" : "•"}
      </span>
      <span className={ok ? "text-zinc-300" : "text-zinc-500"}>{text}</span>
    </li>
  );
}

function PasswordStrength({ password }) {
  const score = useMemo(() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    if (/[a-z]/.test(password)) s += 1;
    if (/[0-9]/.test(password)) s += 1;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) s += 1;
    return s;
  }, [password]);

  if (!password) return <span className="text-xs text-zinc-600">&nbsp;</span>;

  const label =
    score <= 2 ? "Weak" : score === 3 ? "Okay" : score === 4 ? "Strong" : "Excellent";
  const color =
    score <= 2
      ? "text-red-400"
      : score === 3
      ? "text-amber-300"
      : "text-emerald-400";

  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}

function VerifyingState() {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-400">
      <span
        aria-hidden
        className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400"
      />
      Verifying reset link…
    </div>
  );
}

function ExpiredState({ message }) {
  const isExpired = message === "Reset link expired";
  return (
    <div className="space-y-4">
      <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
        {isExpired
          ? "Reset link expired. Please request a new one."
          : "This reset link is invalid or no longer available."}
      </p>
      {message && !isExpired && (
        <p className="text-xs text-zinc-500">Details: {message}</p>
      )}
      <div className="flex flex-col items-start gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-500"
        >
          Return to Dialed
        </Link>
        <a
          href="mailto:workdialed@gmail.com?subject=Dialed%20password%20reset%20help"
          className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          Request a new reset link
        </a>
      </div>
    </div>
  );
}

function SuccessState({ onReturn }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-200"
        >
          ✓
        </span>
        <div>
          <p className="font-medium">Password updated successfully</p>
          <p className="mt-1 text-xs text-emerald-300/80">
            You can now sign in to Dialed with your new password.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={onReturn}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-500"
        >
          Return to Dialed
        </button>
        <a
          href="dialed://"
          className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          Open the Dialed app
        </a>
      </div>
    </div>
  );
}

function UnconfiguredState() {
  return (
    <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      Password reset is temporarily unavailable. Please try again later or
      contact support.
    </p>
  );
}
