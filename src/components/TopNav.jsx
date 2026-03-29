import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:h-16 md:px-10 lg:px-12">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          dialed
        </Link>
        <a
          href="#waitlist"
          className="rounded-full border border-emerald-500/35 px-4 py-2 text-sm text-emerald-400/95 transition-colors hover:border-emerald-500/55 hover:bg-emerald-950/40"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
