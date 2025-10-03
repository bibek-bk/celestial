import { Avatar } from "./ui/Avatar"
import { CoverPhoto } from "./ui/CoverPhoto"

interface ProfileHeaderProps {
  name: string

  bio?: string
  avatar?: string
  coverPhoto?: string
}

export function ProfileHeader({ name , bio, avatar, coverPhoto }: ProfileHeaderProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <CoverPhoto src={coverPhoto} />

      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mt-4 sm:mt-8 relative z-10 px-2 sm:px-0">
        <Avatar
          src={avatar}
          alt={name}
          size="xl"
          className="border-2 sm:border-4 border-background shadow-lg mx-auto sm:mx-0"
        />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">{name}</h1>
          {/* {title && <p className="text-base sm:text-lg text-muted-foreground ">{title}</p>} */}
          {bio && <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-2xl text-pretty">{bio}</p>}
        </div>
      </div>
    </div>
  )
}
