import Link from 'next/link';
import KarmaLogoMark from '@/components/KarmaLogoMark';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_36%),linear-gradient(135deg,_#fefdf7_0%,_#f2fbf5_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[2rem] border border-emerald-900/10 bg-white/85 p-8 shadow-[0_25px_80px_-35px_rgba(16,185,129,0.45)] backdrop-blur sm:p-10 lg:p-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-700/15 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              KARMA Dragon Fruit Farms
            </div>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">
              A polished operations view for investors, buyers, and farm partners.
            </h1>
            <p className="max-w-xl text-lg text-forest-green/80">
              Track capital deployment, estimate profit potential, and keep field documentation ready for serious negotiations.
            </p>
          </div>
          <KarmaLogoMark />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Investment view</p>
            <p className="mt-2 text-sm text-forest-green/80">Monitor saplings, fertilizer, and fungicide spend in one place.</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Negotiation metrics</p>
            <p className="mt-2 text-sm text-forest-green/80">Use baseline cost per kg and future profit to support buyer conversations.</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Photo archive</p>
            <p className="mt-2 text-sm text-forest-green/80">Upload groundwork and farm documentation directly to Supabase storage.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Open investor dashboard
          </Link>
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-700/20 px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Review Supabase setup
          </a>
        </div>
      </section>
    </main>
  );
}
