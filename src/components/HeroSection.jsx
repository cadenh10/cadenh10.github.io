export default function HeroSection() {
  return (
    <section className="relative isolate overflow-visible pb-16 pt-10 md:pb-24 md:pt-12 lg:pb-24">
      {/* Full-bleed ambient layer — sibling to content, never inside max-width/clipped wrappers */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        aria-hidden
      >
        {/* Soft wash: scales down on narrow widths, stronger on lg/xl; stays behind hero left/center */}
        <div
          className="absolute left-[36%] top-[8%] z-0 h-[max(240px,min(480px,52vh))] w-[max(300px,min(720px,96vw))] -translate-x-1/2 rounded-full bg-emerald-600 blur-[72px] opacity-[0.12] sm:left-[38%] sm:blur-[88px] sm:opacity-[0.125] md:left-[40%] md:top-[9%] md:h-[max(280px,min(520px,50vh))] md:w-[max(360px,min(820px,96vw))] md:blur-[115px] lg:left-[42%] lg:top-[10%] lg:h-[max(360px,min(640px,56vh))] lg:w-[max(480px,min(1040px,96vw))] lg:blur-[150px] lg:opacity-[0.13] xl:left-[44%] xl:h-[max(400px,min(760px,58vh))] xl:w-[max(520px,min(1280px,96vw))] xl:blur-[175px] xl:opacity-[0.14]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Dial in.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
            Real-time focus tracking. Built for people who take their time seriously.
          </p>
          <a
            href="#waitlist"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-emerald-600 px-9 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-500"
          >
            Join the waitlist
          </a>
          <p className="mt-4 text-xs text-zinc-600">Be first to access Dialed</p>
        </div>

        {/* Outer: pb reserves space below the frame; inner is the positioning context so bottom-0 aligns to the image, not the padding box */}
        <div className="relative mx-auto mt-14 w-full max-w-[920px] overflow-visible pb-16 md:mt-20 md:pb-32 lg:mt-24 lg:pb-36">
          <div className="relative overflow-visible">
            <img
              src={`${import.meta.env.BASE_URL}images/main-app.png`}
              alt=""
              width={1024}
              height={679}
              decoding="async"
              fetchPriority="high"
              className="relative z-[1] mx-auto block h-auto w-full max-w-[920px] rounded-2xl border border-white/10 shadow-[0_28px_90px_-24px_rgba(0,0,0,0.85)]"
            />
            <img
              src={`${import.meta.env.BASE_URL}showcase/live-focus.png`}
              alt=""
              className="absolute right-0 top-0 z-[2] w-[min(36%,200px)] translate-x-[2%] -translate-y-[2%] rounded-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)] sm:w-[min(40%,240px)] sm:translate-x-[4%] sm:-translate-y-[4%] md:w-[min(42%,280px)] md:translate-x-[5%] md:-translate-y-[5%]"
            />
            <img
              src={`${import.meta.env.BASE_URL}showcase/session-report.png`}
              alt=""
              className="absolute bottom-0 left-0 z-[2] w-[min(46%,220px)] -translate-x-[2%] translate-y-[6%] rounded-2xl border border-white/10 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.8)] sm:w-[min(50%,300px)] sm:-translate-x-[3%] sm:translate-y-[8%] md:w-[min(52%,340px)] md:-translate-x-[4%] md:translate-y-[10%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
