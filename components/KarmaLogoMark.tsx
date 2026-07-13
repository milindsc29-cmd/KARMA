export default function KarmaLogoMark() {
  return (
    <div className="flex items-center gap-3" aria-label="KARMA logo placeholder">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-700/20 bg-emerald-50 shadow-sm">
        <svg
          viewBox="0 0 64 64"
          className="h-8 w-8 text-emerald-700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M31.5 10c-6.7 0-12.1 5.4-12.1 12.1 0 3.2 1.3 6.1 3.4 8.2-3.4 2.3-5.7 6.1-5.7 10.5 0 7 5.7 12.7 12.7 12.7h7.4c7 0 12.7-5.7 12.7-12.7 0-4.4-2.3-8.2-5.7-10.5 2.1-2.1 3.4-5 3.4-8.2C43.6 15.4 38.2 10 31.5 10Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M24.7 22.3c1.5-1.4 3.3-2.2 5.3-2.2 2.4 0 4.6 1 6.1 2.8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M21.8 35.2c2.2 2.4 5.5 3.9 9.1 3.9 3.5 0 6.8-1.5 9-3.9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M31.4 15.7v8.1"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-lg font-semibold tracking-[0.24em] text-emerald-900">KARMA</p>
        <p className="text-sm text-emerald-700/80">Dragon Fruit Farms</p>
      </div>
    </div>
  );
}
