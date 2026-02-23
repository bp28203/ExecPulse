export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-[#0C121E] rounded-2xl border-2 border-slate-200 dark:border-white/[0.12] overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
