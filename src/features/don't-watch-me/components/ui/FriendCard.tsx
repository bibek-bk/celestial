import { Avatar } from "./Avatar"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary"; size?: "sm" | "md" }
function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-accent text-accent-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  } as const
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4",
  } as const
  const classes = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ")
  return <button className={classes} {...props} />
}

interface FriendCardProps {
  name: string
  avatar?: string
  mutualFriends?: number
  isFollowing?: boolean
}

export function FriendCard({ name, avatar, mutualFriends, isFollowing = false }: FriendCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <Avatar src={avatar} alt={name} size="md" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate text-sm sm:text-base">{name}</div>
        {mutualFriends && (
          <div className="text-xs sm:text-sm text-muted-foreground">{mutualFriends} mutual friends</div>
        )}
      </div>
      <Button variant={isFollowing ? "secondary" : "default"} size="sm" className="text-xs sm:text-sm">
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  )
}
