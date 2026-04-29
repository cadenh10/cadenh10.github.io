import { Link } from "react-router-dom";
import { scrollToDownload } from "../lib/scroll.js";
const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
];

export default function TopNav() {
  const handleScrollToDownload = (event) => {
    event.preventDefault();
    scrollToDownload();
  };

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
          href="#download-scroll-target"
          onClick={handleScrollToDownload}
          className="inline-flex min-h-[36px] items-center rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 md:px-5"
        >
          Download
        </a>
      </div>
    </header>
  );
}
