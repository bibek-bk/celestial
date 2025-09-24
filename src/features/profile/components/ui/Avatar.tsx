 

interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, alt = "Profile", size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 sm:w-8 sm:h-8",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
    xl: "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28",
  }

  return (
    <div
      className={[
        "rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0",
        sizeClasses[size],
        className,
      ].filter(Boolean).join(" ")}
    >
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-muted-foreground font-medium text-sm sm:text-base">{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}
