export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        &copy; {year} Sacrament Meeting Planner
      </div>
    </footer>
  );
}
