 

interface CoverPhotoProps {
  src?: string
  alt?: string
  className?: string
}

export function CoverPhoto({ src, alt = "Cover photo", className }: CoverPhotoProps) {
  return (
    <div className={["w-full h-32 sm:h-40 lg:h-48 bg-muted rounded-lg overflow-hidden", className].filter(Boolean).join(" ") }>
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
      )}
    </div>
  )
}
