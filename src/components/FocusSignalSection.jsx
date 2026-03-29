const BAR_COUNT = 48;

function waveformHeights() {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const x = i / (BAR_COUNT - 1);
    const center = Math.exp(-Math.pow((x - 0.5) / 0.1, 2));
    const left = 0.72 * Math.exp(-Math.pow((x - 0.24) / 0.085, 2));
    const right = 0.72 * Math.exp(-Math.pow((x - 0.76) / 0.085, 2));
    const taper = Math.sin(x * Math.PI);
    const raw = 0.06 + 0.94 * Math.max(center, left, right) * (0.35 + 0.65 * taper);
    return raw;
  });
}

const HEIGHTS = waveformHeights();
const MAX_H = Math.max(...HEIGHTS);

export default function FocusSignalSection() {
  return (
    <section
      className="border-t border-white/[0.06] bg-black pt-24 pb-28 md:pt-28 md:pb-36 lg:pt-32 lg:pb-44"
      aria-labelledby="focus-signal-heading"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="focus-signal-heading"
            className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Focus isn&apos;t a timer. It&apos;s a signal.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-zinc-500 md:mt-6 md:text-lg md:leading-relaxed">
            Dialed tracks how you actually work — not just how long you sit.
          </p>

          <div
            className="mx-auto mt-14 flex h-[72px] w-full max-w-[520px] items-end justify-center gap-[2px] md:mt-16 md:h-[84px] md:gap-[3px] lg:mt-[4.5rem]"
            aria-hidden
          >
            {HEIGHTS.map((h, i) => {
              const pct = (h / MAX_H) * 100;
              return (
                <div
                  key={i}
                  className="w-[2px] shrink-0 rounded-full bg-emerald-700/50 md:w-[2.5px]"
                  style={{ height: `${Math.max(10, pct)}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
