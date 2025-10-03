import { StatItem } from "./ui/StatItem"

interface ProfileStatsProps {
  posts?: number
  followers?: number
  following?: number
  projects?: number
}

export function ProfileStats({ posts = 0, followers = 0, following = 0, projects = 0 }: ProfileStatsProps) {
  return (
    <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 border-y border-border overflow-x-auto">
      <StatItem label="Posts" value={posts} />
      <StatItem label="Followers" value={followers} />
      <StatItem label="Following" value={following} />
      <StatItem label="Projects" value={projects} />
    </div>
  )
}
