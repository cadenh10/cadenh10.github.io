import { useState } from "react";
import { Link } from "react-router-dom";
import { DOWNLOAD_URL } from "../lib/constants.js";
import { getWaitlistAttribution } from "../lib/attribution.js";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const SUPPORT_EMAIL = "workdialed@gmail.com";
const CONTACT_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  SUPPORT_EMAIL,
)}`;

export default function FinalSection({ hasReferralCode = false }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function clearFeedback() {
    setFeedback(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setFeedback({ kind: "error", message: "Enter a valid email address." });
      return;
    }

    if (!isSupabaseConfigured() || !supabase) {
      setFeedback({
        kind: "error",
        message: "Waitlist is temporarily unavailable. Please try again later.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const attr = getWaitlistAttribution();
    const { error } = await supabase.from("waitlist_signups").insert({
      email: trimmed,
      source: attr.source,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      referrer: attr.referrer,
    });

    setSubmitting(false);

    if (!error) {
      setFeedback({ kind: "success" });
      setEmail("");
      return;
    }

    if (error.code === "23505") {
      setFeedback({ kind: "duplicate" });
      return;
    }

    setFeedback({
      kind: "error",
      message: "Something went wrong. Please try again.",
    });
  }
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
          id="waitlist"
          className="scroll-mt-24 border-t border-white/[0.05] py-28 md:py-36 lg:py-40"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-heading"
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Ready to get Dialed first?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-zinc-400 md:text-lg">
              Join the waitlist for early access, or download if you already have your invite.
            </p>
            {hasReferralCode && (
              <p className="mt-2 text-xs font-medium text-emerald-400/95">Referral applied</p>
            )}

            <form
              className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center"
              onSubmit={handleSubmit}
            >
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  if (feedback) clearFeedback();
                }}
                disabled={submitting}
                className="min-h-[48px] w-full min-w-0 flex-1 rounded-full border border-zinc-800 bg-zinc-950/90 px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none ring-emerald-500/0 transition-[box-shadow,border-color] focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitting}
                className="min-h-[48px] shrink-0 rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Joining..." : "Join waitlist"}
              </button>
            </form>

            {feedback?.kind === "success" && (
              <p className="mt-4 text-sm text-emerald-400/95" role="status">
                You're on the list.
              </p>
            )}
            {feedback?.kind === "duplicate" && (
              <p className="mt-4 text-sm text-zinc-400" role="status">
                This email is already on the waitlist.
              </p>
            )}
            {feedback?.kind === "error" && (
              <p className="mt-4 text-sm text-red-400/90" role="alert">
                {feedback.message}
              </p>
            )}

            <div className="mt-6 flex justify-center">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-8 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                download
              >
                Download for Mac
              </a>
            </div>

            <p className="mt-5 text-xs text-zinc-500">
              macOS 12 or later • Apple Silicon &amp; Intel
            </p>
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
