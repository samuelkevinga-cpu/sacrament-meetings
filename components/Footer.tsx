export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[.08] print:hidden dark:border-white/[.145]">
      <div className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-foreground/70">
        &copy; {year} Sacrament Meeting Planner | Kevin Samuel Pacheco García
      </div>
    </footer>
  );
}
