const STEPS = [
  {
    step: "01",
    title: "Start a session",
    body: "Pick a subject, set a target, and press start. No setup, no friction.",
  },
  {
    step: "02",
    title: "Dialed tracks focus vs. distraction",
    body: "On-device signals measure attention in real time while you work.",
  },
  {
    step: "03",
    title: "Get a visual recap",
    body: "Finish the session and see a clean breakdown of how you actually worked.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.05] bg-black pb-24 pt-24 md:pb-32 md:pt-28 lg:pb-36 lg:pt-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/95">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
          >
            Three steps. Zero fluff.
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {STEPS.map(({ step, title, body }) => (
            <li
              key={step}
              className="group relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.035] md:p-7"
            >
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-emerald-400/90">
                {step}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white md:text-xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[0.9375rem]">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
