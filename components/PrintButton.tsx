'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium hover:bg-black/[.04] print:hidden dark:border-white/[.145] dark:hover:bg-white/[.05]"
    >
      Print program
    </button>
  );
}
