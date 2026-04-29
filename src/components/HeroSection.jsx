import { scrollToDownload } from "../lib/scroll.js";

export default function HeroSection({ hasReferralCode = false }) {
  const handleScrollToDownload = (event) => {
    event.preventDefault();
    scrollToDownload();
  };

  return (
    <section className="relative isolate overflow-visible pb-16 pt-10 md:pb-24 md:pt-14 lg:pb-28">
      {/* Full-bleed ambient glow — sibling to content, never clipped by max-width wrappers */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        aria-hidden
      >
        <div
          className="absolute left-[36%] top-[8%] z-0 h-[max(240px,min(480px,52vh))] w-[max(300px,min(720px,96vw))] -translate-x-1/2 rounded-full bg-emerald-600 blur-[72px] opacity-[0.12] sm:left-[38%] sm:blur-[88px] sm:opacity-[0.125] md:left-[40%] md:top-[9%] md:h-[max(280px,min(520px,50vh))] md:w-[max(360px,min(820px,96vw))] md:blur-[115px] lg:left-[42%] lg:top-[10%] lg:h-[max(360px,min(640px,56vh))] lg:w-[max(480px,min(1040px,96vw))] lg:blur-[150px] lg:opacity-[0.13] xl:left-[44%] xl:h-[max(400px,min(760px,58vh))] xl:w-[max(520px,min(1280px,96vw))] xl:blur-[175px] xl:opacity-[0.14]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Focus, measured
          </span>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Stay focused.
            <br />
            <span className="text-emerald-400">Prove it.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
            Dialed tracks your focus locally, detects distractions, and turns your study
            sessions into clean visual recaps.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#download-scroll-target"
              onClick={handleScrollToDownload}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-12px_rgba(16,185,129,0.55)] transition-colors hover:bg-emerald-400 sm:px-10"
            >
              Get Dialed
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-8 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:px-10"
            >
              See how it works
            </a>
          </div>
          {hasReferralCode && (
            <p className="mt-3 text-xs font-medium text-emerald-400/95">Referral applied</p>
          )}
          <p className="mt-5 text-xs text-zinc-500 md:text-[13px]">
            <span className="text-zinc-300">Local-first</span>
            <span className="mx-2 text-zinc-700">•</span>
            <span className="text-zinc-300">Private by design</span>
            <span className="mx-2 text-zinc-700">•</span>
            <span className="text-zinc-300">Built for students</span>
          </p>
        </div>

        {/* Outer reserves space for overhanging cards; inner is the positioning context. */}
        <div className="relative mx-auto mt-14 w-full max-w-[960px] overflow-visible pb-16 md:mt-20 md:pb-32 lg:mt-24 lg:pb-36">
          <div className="relative overflow-visible">
            <img
              src={`${import.meta.env.BASE_URL}images/main-app.png`}
              alt="Dialed main interface showing a live focus session"
              width={1024}
              height={679}
              decoding="async"
              fetchPriority="high"
              className="relative z-[1] mx-auto block h-auto w-full max-w-[960px] rounded-2xl border border-white/10 shadow-[0_28px_90px_-24px_rgba(0,0,0,0.9)]"
            />
            <img
              src={`${import.meta.env.BASE_URL}showcase/live-focus.png`}
              alt="Live focus signal overlay"
              loading="lazy"
              decoding="async"
              className="absolute right-0 top-0 z-[2] w-[min(36%,200px)] translate-x-[2%] -translate-y-[2%] rounded-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)] sm:w-[min(40%,240px)] sm:translate-x-[4%] sm:-translate-y-[4%] md:w-[min(42%,280px)] md:translate-x-[5%] md:-translate-y-[5%]"
            />
            <img
              src={`${import.meta.env.BASE_URL}showcase/session-report.png`}
              alt="End-of-session recap card"
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 left-0 z-[2] w-[min(46%,220px)] -translate-x-[2%] translate-y-[6%] rounded-2xl border border-white/10 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.8)] sm:w-[min(50%,300px)] sm:-translate-x-[3%] sm:translate-y-[8%] md:w-[min(52%,340px)] md:-translate-x-[4%] md:translate-y-[10%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
