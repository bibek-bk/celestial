 

interface TabItemProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function TabItem({ label, isActive = false, onClick, className }: TabItemProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0",
        isActive ? "text-foreground border-accent" : "text-muted-foreground border-transparent hover:text-foreground",
        className,
      ].filter(Boolean).join(" ")}
    >
      {label}
    </button>
  )
}
