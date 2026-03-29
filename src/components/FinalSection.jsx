export default function FinalSection() {
  return (
    <div className="relative bg-black">
      {/* Ambient glow — matches hero / premium depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] z-0 h-[min(520px,70vh)] w-[min(900px,100vw)] -translate-x-1/2"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-emerald-600/10 blur-[120px] md:blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        {/* 1. Metrics */}
        <section
          className="border-t border-white/[0.06] py-20 md:py-24 lg:py-28"
          aria-label="Product highlights"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="py-9 text-center md:px-6 md:py-0">
              <p className="text-3xl font-bold tracking-tight text-emerald-400 md:text-4xl">
                Focused
              </p>
              <p className="mt-2 text-sm text-zinc-500 md:text-[0.9375rem]">
                built for deep work
              </p>
            </div>
            <div className="py-9 text-center md:px-6 md:py-0">
              <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Private
              </p>
              <p className="mt-2 text-sm text-zinc-500 md:text-[0.9375rem]">
                local-first by design
              </p>
            </div>
            <div className="py-9 text-center md:px-6 md:py-0">
              <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Precise
              </p>
              <p className="mt-2 text-sm text-zinc-500 md:text-[0.9375rem]">
                real-time tracking insights
              </p>
            </div>
          </div>
        </section>

        {/* 2. Brand quote */}
        <section className="pb-32 md:pb-36 lg:pb-40" aria-labelledby="brand-quote-heading">
          <h2 id="brand-quote-heading" className="sr-only">
            Brand statement
          </h2>
          <blockquote className="mx-auto max-w-2xl rounded-2xl border border-zinc-800/90 bg-zinc-950/80 px-8 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm md:px-12 md:py-12">
            <p className="text-lg font-medium leading-relaxed text-white md:text-xl md:leading-relaxed">
              &ldquo;Dialed is built to show you how you actually work, not just
              how long you sit.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-zinc-500">
              &mdash; Dialed Team
            </footer>
          </blockquote>
        </section>

        {/* 3. Final CTA */}
        <section
          id="waitlist"
          className="scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-12 lg:pb-40 lg:pt-8"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              Get Dialed first.
            </h2>
            <p className="mt-3 text-base text-zinc-500 md:text-lg">
              Early access for those who take focus seriously.
            </p>

            <form
              className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-3"
              onSubmit={(e) => e.preventDefault()}
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
                className="min-h-[48px] w-full min-w-0 flex-1 rounded-full border border-zinc-800 bg-zinc-950/90 px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none ring-emerald-500/0 transition-[box-shadow,border-color] focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 sm:max-w-none"
              />
              <button
                type="submit"
                className="min-h-[48px] shrink-0 rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 sm:px-10"
              >
                Join waitlist
              </button>
            </form>
            <p className="mt-4 text-xs text-zinc-600">No spam. Early access only.</p>
          </div>
        </section>
      </div>

      {/* 4. Footer */}
      <footer className="border-t border-white/[0.06] bg-black">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 px-6 py-12 text-xs text-zinc-600 sm:flex-row md:px-10 md:py-14 lg:px-12">
          <p>© 2026 Dialed. All rights reserved.</p>
          <p className="font-medium tracking-tight text-zinc-600">dialed</p>
        </div>
      </footer>
    </div>
  );
}
