"use client";

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import KarmaLogoMark from '@/components/KarmaLogoMark';
import FarmMilestoneLogger from '@/components/FarmMilestoneLogger';

type InvestmentRecord = {
  id?: string;
  date: string;
  category: string;
  cost_inr: number;
  description: string;
};

type SalesProjectionRecord = {
  id?: string;
  target_price: number;
  estimated_yield_kg: number;
  actual_revenue: number;
};

type UploadState = {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message: string;
};

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function KarmaFarmDashboard() {
  const [investments, setInvestments] = useState<InvestmentRecord[]>([]);
  const [projections, setProjections] = useState<SalesProjectionRecord[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    message: '',
  });

  useEffect(() => {
    const loadData = async () => {
      if (!supabase) return;

      const [{ data: investmentData, error: investmentError }, { data: projectionData, error: projectionError }] =
        await Promise.all([
          supabase.from('karma_investments').select('*').order('date', { ascending: true }),
          supabase.from('karma_sales_projections').select('*').order('target_price', { ascending: false }),
        ]);

      if (investmentError) {
        console.error('Investment query failed', investmentError);
      }

      if (projectionError) {
        console.error('Projection query failed', projectionError);
      }

      setInvestments((investmentData as InvestmentRecord[]) ?? []);
      setProjections((projectionData as SalesProjectionRecord[]) ?? []);
    };

    loadData();
  }, []);

  const totals = useMemo(() => {
    const totalInvestment = investments.reduce((sum, item) => sum + Number(item.cost_inr || 0), 0);
    const expectedYield = projections.reduce((sum, item) => sum + Number(item.estimated_yield_kg || 0), 0);
    const projectedRevenue = projections.reduce((sum, item) => sum + Number(item.actual_revenue || 0), 0);
    const estimatedFutureProfit = projectedRevenue - totalInvestment;
    const baselineCostPerKg = expectedYield > 0 ? totalInvestment / expectedYield : 0;

    return {
      totalInvestment,
      expectedYield,
      projectedRevenue,
      estimatedFutureProfit,
      baselineCostPerKg,
    };
  }, [investments, projections]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !supabase) {
      setUploadState({ status: 'error', message: 'Please choose a file and ensure Supabase is configured.' });
      return;
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    setUploadState({ status: 'uploading', message: 'Uploading photo to Supabase storage…' });

    const { error } = await supabase.storage.from('karma-farm-photos').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      setUploadState({ status: 'error', message: error.message });
      return;
    }

    setUploadState({
      status: 'success',
      message: `Uploaded ${file.name} successfully.`,
    });
    event.target.value = '';
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_38%),linear-gradient(135deg,_#fefdf7_0%,_#f4fbf6_100%)] px-4 py-8 text-forest-green sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-emerald-900/10 bg-white/80 p-6 shadow-[0_20px_70px_-30px_rgba(16,185,129,0.35)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-emerald-700/15 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                Investor-ready operations dashboard
              </div>
              <h1 className="mb-3 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">
                KARMA Dragon Fruit Farms
              </h1>
              <p className="max-w-xl text-lg text-forest-green/80">
                A transparent view of the 2-acre farm&apos;s capital deployment, expected harvest value, and buyer-ready cost positioning during the one-year growth window.
              </p>
            </div>
            <KarmaLogoMark />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-900/10 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Total Investment So Far</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-950">{currency.format(totals.totalInvestment)}</p>
            <p className="mt-2 text-sm text-forest-green/70">Saplings, fertilizer, fungicides, and field operating spend.</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Estimated Future Profit</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-950">{currency.format(totals.estimatedFutureProfit)}</p>
            <p className="mt-2 text-sm text-forest-green/70">Projected revenue less total capital invested.</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Baseline Cost Per Kg</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-950">{currency.format(totals.baselineCostPerKg)}</p>
            <p className="mt-2 text-sm text-forest-green/70">Total investment divided by expected yield in kg.</p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-emerald-900/10 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Investment ledger</p>
                <h2 className="text-2xl font-semibold text-emerald-950">Operational cost tracking</h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                {investments.length} entries
              </div>
            </div>
            <div className="space-y-3">
              {investments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-emerald-800/20 bg-emerald-50/50 p-5 text-sm text-forest-green/70">
                  No investment data has been synced yet. Add rows to the Supabase table to populate this panel.
                </div>
              ) : (
                investments.map((item, index) => (
                  <div key={`${item.date}-${index}`} className="flex flex-col gap-2 rounded-xl border border-emerald-900/10 bg-emerald-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-emerald-950">{item.description}</p>
                      <p className="text-sm text-forest-green/70">{item.category} • {item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-900">{currency.format(Number(item.cost_inr || 0))}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-900/10 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Buyer negotiation support</p>
              <h2 className="text-2xl font-semibold text-emerald-950">Yield and revenue assumptions</h2>
            </div>
            <div className="space-y-3">
              {projections.length === 0 ? (
                <div className="rounded-xl border border-dashed border-emerald-800/20 bg-emerald-50/50 p-5 text-sm text-forest-green/70">
                  Add sales projection rows in Supabase to shape the negotiation view.
                </div>
              ) : (
                projections.map((item, index) => (
                  <div key={`${item.target_price}-${index}`} className="rounded-xl border border-emerald-900/10 bg-emerald-50/40 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-emerald-950">Target price: {currency.format(Number(item.target_price || 0))}/kg</p>
                      <p className="text-sm text-forest-green/70">{Number(item.estimated_yield_kg || 0).toLocaleString()} kg</p>
                    </div>
                    <p className="mt-2 text-sm text-forest-green/70">Estimated revenue: {currency.format(Number(item.actual_revenue || 0))}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-900/10 bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Groundwork documentation</p>
              <h2 className="text-2xl font-semibold text-emerald-950">Upload farm photos to Supabase storage</h2>
              <p className="mt-2 max-w-2xl text-sm text-forest-green/70">
                Store planting, irrigation, and field preparation photos in the <span className="font-semibold text-emerald-800">karma-farm-photos</span> bucket for investor review.
              </p>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-700/30 bg-emerald-50/70 px-6 py-6 text-center transition hover:border-emerald-700 hover:bg-emerald-50">
              <span className="text-sm font-semibold text-emerald-800">Choose photo</span>
              <span className="mt-1 text-sm text-forest-green/70">PNG, JPG, WEBP up to your browser limits</span>
              <input type="file" accept="image/*" className="sr-only" onChange={handleUpload} />
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 text-sm text-forest-green/70">
            {uploadState.status === 'uploading' && <p className="text-emerald-700">{uploadState.message}</p>}
            {uploadState.status === 'success' && <p className="text-emerald-700">{uploadState.message}</p>}
            {uploadState.status === 'error' && <p className="text-rose-700">{uploadState.message}</p>}
            {uploadState.status === 'idle' && <p>No upload attempted yet.</p>}
          </div>
        </section>

        <FarmMilestoneLogger />
      </div>
    </main>
  );
}
