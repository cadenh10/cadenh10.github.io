import { Link } from "react-router-dom";

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: April 19, 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-zinc-400 md:text-base">
          <p>
            This policy describes how Dialed (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;the app&rdquo;) handles information when you use the Dialed
            application and related services. Dialed is built with a local-first
            approach to focus tracking.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Camera and face tracking</h2>
            <p>
              Dialed may use your device camera only for real-time face tracking to
              support focus-related signals. No video or images from the camera are
              recorded, stored, or uploaded by Dialed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Local processing</h2>
            <p>
              Core focus-related processing happens on your device. Session and
              related usage data used by the app are stored locally on your device
              unless you explicitly use a feature that sends data elsewhere (this
              landing page is separate from the app).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Active window detection</h2>
            <p>
              Dialed may use active window or foreground-app information to help score
              or contextualize focus. That signal is used in line with the app&rsquo;s
              local-first design; we do not use it to collect or upload the contents
              of your screen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Analytics (Aptabase)</h2>
            <p>
              Dialed uses Aptabase for anonymous analytics only. Analytics are limited
              to things like feature usage and in-app interactions. They do not include
              personal data, camera data, video, audio recordings, or screen contents.
            </p>
            <p>
              You can opt out of analytics in the app&rsquo;s settings if you prefer not
              to send this anonymous usage information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p>
              Questions about this policy:{" "}
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
