import { Link } from "react-router-dom";
import { DOWNLOAD_URL } from "../lib/constants.js";

const SUPPORT_EMAIL = "workdialed@gmail.com";
const CONTACT_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  SUPPORT_EMAIL,
)}`;

export default function FinalSection() {
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
          className="scroll-mt-24 border-t border-white/[0.05] py-28 md:py-36 lg:py-40"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-heading"
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Ready to get Dialed?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-zinc-400 md:text-lg">
              Free to download. Works offline. Built for Mac.
            </p>

            <div className="mt-10 flex justify-center">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-emerald-500 px-10 py-3.5 text-base font-semibold text-black shadow-[0_14px_50px_-10px_rgba(16,185,129,0.55)] transition-colors hover:bg-emerald-400"
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
