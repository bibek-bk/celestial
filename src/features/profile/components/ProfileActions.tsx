// Replaced external Button with a simple inline button variant for React-only setup
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "secondary"; size?: "sm" | "md" | "icon" }

function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-accent text-accent-foreground hover:opacity-90",
    outline: "border border-border text-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  } as const
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    icon: "h-10 w-10",
  } as const
  const classes = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ")
  return <button className={classes} {...props} />
}
import { MessageCircle, UserPlus, Share } from "lucide-react"

interface ProfileActionsProps {
  isOwnProfile?: boolean
  isFollowing?: boolean
}

export function ProfileActions({ isOwnProfile = false, isFollowing = false }: ProfileActionsProps) {
  if (isOwnProfile) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <Button variant="outline" className="flex-1 bg-transparent">
          Edit Profile
        </Button>
        <Button variant="outline" size="icon" className="sm:w-auto w-full bg-transparent">
          <Share className="w-4 h-4" />
          <span className="ml-2 sm:hidden">Share Profile</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      <Button className="flex-1">
        <UserPlus className="w-4 h-4 mr-2" />
        {isFollowing ? "Following" : "Follow"}
      </Button>
      <Button variant="outline" className="flex-1 sm:flex-initial bg-transparent">
        <MessageCircle className="w-4 h-4 mr-2" />
        Message
      </Button>
      <Button variant="outline" size="icon" className="sm:w-auto w-full bg-transparent">
        <Share className="w-4 h-4" />
        <span className="ml-2 sm:hidden">Share</span>
      </Button>
    </div>
  )
}
