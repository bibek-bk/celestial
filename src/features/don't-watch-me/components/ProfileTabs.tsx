import { useState } from "react"
import { TabItem } from "./ui/TabItem"

interface ProfileTabsProps {
  onTabChange?: (tab: string) => void
}

export function ProfileTabs({ onTabChange }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("posts")

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "friends", label: "Friends" },
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
    </div>
  )
}
