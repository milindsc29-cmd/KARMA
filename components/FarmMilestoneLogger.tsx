'use client';

import { FormEvent, useMemo, useState } from 'react';

type MilestoneEntry = {
  id: number;
  note: string;
  createdAt: string;
};

const starterMilestones: MilestoneEntry[] = [
  {
    id: 1,
    note: 'Monsoon spray completed successfully with good canopy coverage.',
    createdAt: 'Today',
  },
];

export default function FarmMilestoneLogger() {
  const [entries, setEntries] = useState<MilestoneEntry[]>(starterMilestones);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');

  const recentEntries = useMemo(() => entries.slice(0, 4), [entries]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();

    if (!trimmed) {
      setStatus('Please add a milestone note before saving.');
      return;
    }

    const nextEntry: MilestoneEntry = {
      id: Date.now(),
      note: trimmed,
      createdAt: 'Just now',
    };

    setEntries((current) => [nextEntry, ...current]);
    setDraft('');
    setStatus('Milestone logged for the KARMA team.');
  };

  return (
    <section className="rounded-[2rem] border border-emerald-900/10 bg-white/90 p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">Farm milestone logger</p>
          <h2 className="text-2xl font-semibold text-emerald-950">Track field progress with investor-friendly notes</h2>
          <p className="mt-2 max-w-2xl text-sm text-forest-green/70">
            Capture updates such as monsoon sprays, flowering milestones, and operational observations for the next review.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold text-forest-green" htmlFor="milestone-notes">
          Milestone notes
        </label>
        <textarea
          id="milestone-notes"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Example: First flowering observed on the eastern block after the recent monsoon spray."
          rows={5}
          className="w-full rounded-2xl border border-emerald-900/10 bg-emerald-50/50 px-4 py-3 text-sm text-forest-green outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Log Milestone
          </button>
          {status ? <p className="text-sm text-emerald-700">{status}</p> : null}
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-emerald-900/10 bg-emerald-50/60 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Recent milestones</p>
        <ul className="mt-3 space-y-2">
          {recentEntries.map((entry) => (
            <li key={entry.id} className="rounded-xl border border-emerald-900/10 bg-white/70 px-3 py-2 text-sm text-forest-green/80">
              {entry.note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
