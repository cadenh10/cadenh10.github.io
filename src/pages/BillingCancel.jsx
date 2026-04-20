import { Link } from "react-router-dom";

export default function BillingCancel() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col justify-center px-6 py-16 md:px-10 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Checkout canceled
        </h1>
        <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-zinc-400 md:text-base">
          No worries - your plan wasn&apos;t changed.
        </p>

        <div className="mt-8 flex flex-col items-start gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
          >
            Return home
          </Link>
          <a
            href="dialed://"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Try again in Dialed
          </a>
        </div>
      </div>
    </div>
  );
}
