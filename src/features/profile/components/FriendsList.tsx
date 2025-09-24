import { FriendCard } from "./ui/FriendCard"

interface Friend {
  id: string
  name: string
  avatar?: string
  mutualFriends?: number
  isFollowing?: boolean
}

interface FriendsListProps {
  friends?: Friend[]
  showAll?: boolean
}

export function FriendsList({ friends = [], showAll = false }: FriendsListProps) {
  const displayFriends = showAll ? friends : friends.slice(0, 6)

  if (friends.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="text-muted-foreground text-sm sm:text-base">No friends yet</div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm sm:text-base">Friends ({friends.length})</h3>
        {!showAll && friends.length > 6 && (
          <button className="text-accent hover:underline text-xs sm:text-sm">See all</button>
        )}
      </div>

      <div className="space-y-1 sm:space-y-2">
        {displayFriends.map((friend) => (
          <FriendCard
            key={friend.id}
            name={friend.name}
            avatar={friend.avatar}
            mutualFriends={friend.mutualFriends}
            isFollowing={friend.isFollowing}
          />
        ))}
      </div>
    </div>
  )
}
