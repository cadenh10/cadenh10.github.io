const base = import.meta.env.BASE_URL;

const shot = `${base}showcase/features`;

function ProductShot({ src, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      decoding="async"
      loading="lazy"
      className={`h-auto w-full max-w-full rounded-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)] ${className}`}
    />
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-black pb-24 pt-8 md:pb-32 md:pt-10 lg:pb-40 lg:pt-14"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <h2
          id="features-heading"
          className="-mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/95"
        >
          Features
        </h2>

        {/* Row 1 — text left, visuals right */}
        <div className="mt-4 grid grid-cols-1 items-center gap-12 md:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg">
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Know when you&apos;re locked in
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              Real-time tracking detects when you&apos;re focused or drifting. No
              guesswork.
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-4">
            <ProductShot src={`${shot}/live-focus-focused.png`} />
            <ProductShot src={`${shot}/live-focus-distracted.png`} />
          </div>
        </div>

        {/* Row 2 — visual left, text right */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 md:mt-28 md:gap-14 lg:mt-32 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex min-w-0 justify-center lg:order-1 lg:justify-start">
            <div className="w-full max-w-[520px]">
              <ProductShot src={`${shot}/session-focus-report.png`} />
            </div>
          </div>
          <div className="order-1 max-w-lg lg:order-2">
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Measure your sessions
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              Every session is broken down into clear, actionable metrics.
            </p>
          </div>
        </div>

        {/* Row 3 — text left, visuals right */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 md:mt-28 md:gap-14 lg:mt-32 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg">
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Catch distractions instantly
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              Dialed detects when your attention shifts and pulls you back.
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-4">
            <ProductShot src={`${shot}/activity-distracted.png`} />
            <ProductShot src={`${shot}/activity-focused.png`} />
          </div>
        </div>

        {/* Row 4 — visual left, text right */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 md:mt-28 md:gap-14 lg:mt-32 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex min-w-0 justify-center lg:order-1 lg:justify-start">
            <div className="w-full max-w-[560px]">
              <ProductShot src={`${shot}/camera-calibration.png`} />
            </div>
          </div>
          <div className="order-1 max-w-lg lg:order-2">
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Built for precision
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              Advanced calibration ensures your focus data is reliable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
