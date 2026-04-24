const base = import.meta.env.BASE_URL;
const shot = `${base}showcase/features`;

function ProductShot({ src, alt = "", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading="lazy"
      className={`h-auto w-full max-w-full rounded-2xl border border-white/10 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.8)] ${className}`}
    />
  );
}

const FEATURES = [
  {
    eyebrow: "Focus tracking",
    title: "Know when you're locked in.",
    body: "On-device signals tell you — in real time — whether you're actually focused or drifting.",
    media: (
      <div className="flex w-full min-w-0 flex-col gap-4">
        <ProductShot
          src={`${shot}/live-focus-focused.png`}
          alt="Live focus meter showing a focused state"
        />
        <ProductShot
          src={`${shot}/live-focus-distracted.png`}
          alt="Live focus meter showing a distracted state"
        />
      </div>
    ),
    reverse: false,
  },
  {
    eyebrow: "Session recaps",
    title: "Every session becomes a clean recap.",
    body: "Focus time, distraction time, and a visual timelapse of the whole session — generated automatically.",
    media: (
      <div className="w-full max-w-[520px]">
        <ProductShot
          src={`${shot}/session-focus-report.png`}
          alt="End-of-session report with focus breakdown"
        />
      </div>
    ),
    reverse: true,
  },
  {
    eyebrow: "Distraction detection",
    title: "Catch distractions the moment they start.",
    body: "Dialed notices when your attention shifts off-task and logs it without breaking your flow.",
    media: (
      <div className="flex w-full min-w-0 flex-col gap-4">
        <ProductShot
          src={`${shot}/activity-distracted.png`}
          alt="Activity feed highlighting a distraction"
        />
        <ProductShot
          src={`${shot}/activity-focused.png`}
          alt="Activity feed during focused work"
        />
      </div>
    ),
    reverse: false,
  },
  {
    eyebrow: "Built for precision",
    title: "Calibrated once. Reliable every session.",
    body: "A quick camera calibration tunes Dialed to you, so the focus signal stays accurate day after day.",
    media: (
      <div className="w-full max-w-[560px]">
        <ProductShot
          src={`${shot}/camera-calibration.png`}
          alt="Camera calibration screen"
        />
      </div>
    ),
    reverse: true,
  },
  {
    eyebrow: "Core stats",
    title: "See exactly how focused you were",
    body: "Dialed turns every session into clear focus stats — deep work time, distractions, session count, and a focus score across week, month, or year.",
    media: (
      <div className="w-full max-w-[720px]">
        <ProductShot
          src={`${shot}/core-stats.png`}
          alt="Core Stats dashboard showing focus score, deep work time, distraction time, and a week/month/year toggle"
        />
      </div>
    ),
    reverse: false,
  },
  {
    eyebrow: "Momentum",
    title: "Track progress that actually feels rewarding",
    body: "Build momentum with lifetime focus time, progress benchmarks, and simple comparisons that make studying feel measurable without extra work.",
    media: (
      <div className="w-full max-w-[720px]">
        <ProductShot
          src={`${shot}/lifetime-focus.png`}
          alt="Lifetime Focus view showing total focused time, percentile curve, and momentum cards"
        />
      </div>
    ),
    reverse: true,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative border-t border-white/[0.05] bg-black pb-24 pt-24 md:pb-32 md:pt-28 lg:pb-36 lg:pt-32"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/95">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
          >
            Focus you can actually see.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-28 lg:gap-32">
          {FEATURES.map(({ eyebrow, title, body, media, reverse }) => (
            <div
              key={eyebrow}
              className="grid grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16"
            >
              <div
                className={`max-w-lg ${
                  reverse ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
                  {eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-[2rem]">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                  {body}
                </p>
              </div>
              <div
                className={`order-1 flex min-w-0 justify-center ${
                  reverse ? "lg:justify-start" : "lg:order-2 lg:justify-end"
                }`}
              >
                {media}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
