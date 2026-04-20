import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col justify-center px-6 py-16 md:px-10 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Billing updated
        </h1>
        <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-zinc-400 md:text-base">
          Your subscription details were updated. Return to Dialed and refresh billing
          if needed.
        </p>

        <div className="mt-8 flex flex-col items-start gap-4">
          <a
            href="dialed://"
            className="inline-flex items-center justify-center rounded-md border border-emerald-500/70 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-emerald-200"
          >
            Back to Dialed
          </a>
          <Link
            to="/"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
