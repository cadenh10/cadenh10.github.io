const POINTS = [
  {
    title: "No cloud dependency",
    body: "Sessions, stats, and focus data live on your Mac — not our servers.",
  },
  {
    title: "No unnecessary tracking",
    body: "Optional, anonymous analytics. No personal data, screen contents, or audio.",
  },
  {
    title: "Camera, only for focus",
    body: "Your camera is processed on-device to detect focus. Nothing is recorded or uploaded.",
  },
];

export default function PrivacySection() {
  return (
    <section
      id="privacy"
      className="relative border-t border-white/[0.05] bg-black pb-24 pt-24 md:pb-32 md:pt-28 lg:pb-36 lg:pt-32"
      aria-labelledby="privacy-heading"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/95">
            Privacy
          </p>
          <h2
            id="privacy-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
          >
            Your data stays on your device.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Dialed is local-first by design. You own your focus data — we don&apos;t.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {POINTS.map(({ title, body }) => (
            <li
              key={title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-7"
            >
              <h3 className="text-base font-semibold text-white md:text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[0.9375rem]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
