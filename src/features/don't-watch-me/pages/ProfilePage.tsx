import { useState } from "react"
import { ProfileHeader } from "../components/ProfileHeader"
import { ProfileStats } from "../components/ProfileStats"
import { ProfileActions } from "../components/ProfileActions"
import { ProfileTabs } from "../components/ProfileTabs"
import { PostGrid } from "../components/PostGrid"
import { FriendsList } from "../components/FriendsList"

// Mock data - replace with real data
const mockUser = {
  name: "Alex Johnson",
  title: "Frontend Developer",
  bio: "I build accessible, pixel-perfect digital experiences for the web. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.",
  avatar: "/professional-headshot.png",
  coverPhoto: "/minimal-workspace.png",
  stats: {
    posts: 127,
    followers: 2840,
    following: 312,
    projects: 24,
  },
  about: {
    location: "San Francisco, CA",
    joinDate: "March 2021",
    website: "https://alexjohnson.dev",
    occupation: "Senior Frontend Engineer at TechCorp",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
  },
}

const mockPosts = [
  { id: "1", image: "/web-design-concept.png", title: "New landing page design", likes: 42, comments: 8 },
  { id: "2", image: "/mobile-app-showcase.png", title: "Mobile app prototype", likes: 38, comments: 12 },
  { id: "3", image: "/modern-data-dashboard.png", title: "Dashboard redesign", likes: 56, comments: 15 },
]

const mockFriends = [
  { id: "1", name: "Sarah Chen", avatar: "/woman-portrait.png", mutualFriends: 12, isFollowing: true },
  { id: "2", name: "Mike Rodriguez", avatar: "/thoughtful-man-portrait.png", mutualFriends: 8, isFollowing: false },
  { id: "3", name: "Emily Davis", avatar: "/woman-portrait.png", mutualFriends: 15, isFollowing: true },
]

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostGrid posts={mockPosts} />
      case "friends":
        return <FriendsList friends={mockFriends} showAll />
      default:
        return <PostGrid posts={mockPosts} />
    }
  }

  return (
    <div className="min-h-screen w-full  bg-background">
      <div className="max-w-4xl  mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <ProfileHeader
          name={mockUser.name}
          bio={mockUser.bio}
          avatar={mockUser.avatar}
          coverPhoto={mockUser.coverPhoto}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:w-2/3 space-y-4 sm:space-y-6">
            <ProfileStats
              posts={mockUser.stats.posts}
              followers={mockUser.stats.followers}
              following={mockUser.stats.following}
              projects={mockUser.stats.projects}
            />

            <ProfileTabs onTabChange={setActiveTab} />

            <div className="min-h-[300px] sm:min-h-[400px]">{renderTabContent()}</div>
          </div>

          <div className="lg:w-1/3 order-first lg:order-last">
            <ProfileActions isOwnProfile />
          </div>
        </div>
      </div>
    </div>
  )
}
