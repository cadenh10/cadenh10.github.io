import { Link } from "react-router-dom";
import { useState } from "react";
import { DOWNLOAD_URL } from "../lib/constants.js";
import { supabase } from "../lib/supabase.js";

const SUPPORT_EMAIL = "workdialed@gmail.com";
const CONTACT_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  SUPPORT_EMAIL,
)}`;

export default function FinalSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isDuplicateEmailError = (error) => {
    if (!error) return false;
    const message = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
    return error.code === "23505" || message.includes("duplicate");
  };

  const handleWindowsWaitlistSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    if (!supabase) {
      setStatus("error");
      setErrorMessage("Waitlist is unavailable right now. Please try again soon.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const { error } = await supabase.from("windows_waitlist").insert({
      email: normalizedEmail,
      source: "website_windows_waitlist",
      user_agent: navigator.userAgent,
    });

    if (error && !isDuplicateEmailError(error)) {
      setStatus("error");
      setErrorMessage("Could not join waitlist. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setStatus("success");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-black">
      {/* Ambient glow to carry hero energy into the final CTA */}
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] z-0 h-[min(520px,70vh)] w-[min(900px,100vw)] -translate-x-1/2"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-emerald-600/10 blur-[120px] md:blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <section
          id="download"
          className="scroll-mt-24 border-t border-white/[0.05] py-24 md:py-28 lg:py-32"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-[1040px] text-center">
            <h2
              id="cta-heading"
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Ready to get Dialed?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-zinc-400 md:text-lg">
              Free to download. Works offline.
            </p>
            <div id="download-scroll-target" aria-hidden="true" />

            <div id="download-options" className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-emerald-500/[0.09] to-emerald-500/[0.03] p-7 text-left shadow-[0_18px_56px_-32px_rgba(16,185,129,0.55)] md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
                  Mac
                </p>
                <p className="mt-2 text-sm text-zinc-300">Stable release available now.</p>
                <p className="mt-2 text-xs text-emerald-100/75">
                  macOS 12 or later • Apple Silicon &amp; Intel
                </p>
                <a
                  href={DOWNLOAD_URL}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-emerald-500 px-6 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
                >
                  Download for Mac
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-left md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  Windows
                </p>
                <p className="mt-2 text-sm text-zinc-400">Join the waitlist for first access.</p>
                <form className="mt-5 space-y-3" onSubmit={handleWindowsWaitlistSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setErrorMessage("");
                      }
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isSubmitting || status === "success"}
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-emerald-400/60"
                    aria-label="Email for Windows waitlist"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || status === "success"}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Joining..." : "Join Windows Waitlist"}
                  </button>
                </form>
                {status === "success" && (
                  <p className="mt-3 text-sm font-medium text-emerald-300">
                    You're on the Windows waitlist.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm font-medium text-rose-300">{errorMessage}</p>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>

      <footer className="border-t border-white/[0.05] bg-black">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 px-6 py-10 text-xs text-zinc-500 sm:flex-row md:px-10 md:py-12 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <p>© 2026 Dialed</p>
            <Link to="/privacy" className="transition-colors hover:text-zinc-300">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-zinc-300">
              Terms
            </Link>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-zinc-300"
            >
              Contact
            </a>
          </div>
          <p className="font-medium tracking-tight text-zinc-500">dialed</p>
        </div>
      </footer>
    </div>
  );
}
