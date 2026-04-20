import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-[800px] px-6 py-16 md:px-10 md:py-20">
        <p className="mb-8 text-sm text-zinc-500">
          <Link
            to="/"
            className="text-emerald-500/90 transition-colors hover:text-emerald-400"
          >
            ← Back to Dialed
          </Link>
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: April 19, 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-zinc-400 md:text-base">
          <p>
            By downloading, installing, or using Dialed (&ldquo;the app&rdquo;), you
            agree to these Terms of Service. If you do not agree, do not use the app.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Permitted use</h2>
            <p>Dialed is for your personal, non-commercial use only.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Provided &ldquo;as is&rdquo;</h2>
            <p>
              Dialed is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              basis. We make no warranties or guarantees of any kind, whether express or
              implied, including but not limited to fitness for a particular purpose,
              accuracy of focus or productivity metrics, availability, uptime, or
              uninterrupted operation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Dialed and its creators are not
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, productivity, goodwill, data, or
              other intangible losses, arising out of or related to your use of or
              inability to use the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Your responsibilities</h2>
            <p>
              You are responsible for granting or revoking any device permissions (such
              as camera or accessibility-related permissions) and for using Dialed in
              compliance with applicable laws and any agreements that apply to your
              device or workplace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:workdialed@gmail.com"
                className="text-emerald-500/90 underline-offset-2 hover:text-emerald-400 hover:underline"
              >
                workdialed@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
