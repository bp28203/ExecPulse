export default function Soundwave() {
  return (
    <div className="flex items-center gap-1 h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 bg-rose-500 rounded-full animate-bounce"
          style={{ animationDuration: `${0.4 + (i * 0.1)}s`, height: `${40 + (Math.random() * 60)}%` }}
        />
      ))}
    </div>
  );
}
