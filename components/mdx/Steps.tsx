export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="my-6 space-y-4">{children}</ol>
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-1 font-medium">{title}</p>
      <div className="text-white/80">{children}</div>
    </li>
  )
}
