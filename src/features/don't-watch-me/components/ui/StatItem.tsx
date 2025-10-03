 

interface StatItemProps {
  label: string
  value: string | number
  className?: string
}

export function StatItem({ label, value, className }: StatItemProps) {
  return (
    <div className={["text-center min-w-0 flex-shrink-0", className].filter(Boolean).join(" ") }>
      <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">{value}</div>
      <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{label}</div>
    </div>
  )
}
