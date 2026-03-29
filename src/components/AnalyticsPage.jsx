import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured() || !supabase) {
        setError("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "get_waitlist_analytics"
      );

      if (cancelled) return;

      if (rpcError) {
        setError(rpcError.message || "Could not load analytics.");
        setData(null);
      } else {
        setData(rpcData);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto w-full max-w-screen-lg px-6 py-14 md:px-10 md:py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Waitlist analytics
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Internal — aggregate counts only.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex w-fit rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300"
          >
            ← Back to site
          </Link>
        </div>

        {loading && (
          <p className="text-sm text-zinc-500">Loading…</p>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-500/25 bg-red-500/5 px-5 py-4 text-sm text-red-200/90">
            {error}
          </div>
        )}

        {data && !loading && !error && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Total signups" value={data.total} />
              <StatCard label="Today (UTC)" value={data.today} />
              <StatCard label="Last 7 days" value={data.last_7_days} />
            </div>

            <section className="rounded-2xl border border-zinc-800/90 bg-zinc-950/50 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                By source
              </h2>
              <ul className="mt-4 space-y-2">
                {(data.by_source || []).length === 0 && (
                  <li className="text-sm text-zinc-600">No data yet.</li>
                )}
                {(data.by_source || []).map((row) => (
                  <li
                    key={row.source}
                    className="flex items-center justify-between border-b border-white/[0.06] py-2 text-sm last:border-0"
                  >
                    <span className="text-zinc-300">{row.source}</span>
                    <span className="tabular-nums text-zinc-500">{row.count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-zinc-800/90 bg-zinc-950/50 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                Daily (UTC, last 7 days)
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {(data.daily_last_7 || []).map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-400">{row.day}</span>
                    <span className="tabular-nums text-zinc-300">{row.count}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800/90 bg-zinc-950/50 px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
        {value ?? "—"}
      </p>
    </div>
  );
}
