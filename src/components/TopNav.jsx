import { Link } from "react-router-dom";
import { DOWNLOAD_URL } from "../lib/constants.js";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
];

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.04] bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:h-16 md:px-10 lg:px-12">
        <Link
          to="/"
          className="flex items-center text-lg font-semibold tracking-tight text-white"
          aria-label="Dialed home"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Dialed"
            className="h-6 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={DOWNLOAD_URL}
          className="inline-flex min-h-[36px] items-center rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 md:px-5"
          download
        >
          Download
        </a>
      </div>
    </header>
  );
}
