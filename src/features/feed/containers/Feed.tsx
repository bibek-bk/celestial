import React from 'react';
import { PostCard } from '../components/post/PostCard';
import { SkeletonPost } from '../components/post/SkeletonPost';

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    user: {
      username: 'johndoe',
      avatar: '/placeholder-user.jpg',
      isVerified: true
    },
    media: [
      {
        id: '1',
        type: 'image' as const,
        url: '/placeholder.jpg',
        alt: 'Beautiful sunset over the mountains'
      }
    ],
    caption: 'Just caught this amazing sunset from my hike today! 🌅 The colors were absolutely incredible. Nature never fails to amaze me. #sunset #hiking #nature #photography #adventure #mountains #goldenhour #beautiful #landscape',
    likes: 1247,
    isLiked: false,
    comments: [
      {
        id: '1',
        username: 'nature_lover',
        text: 'This is absolutely stunning! Where was this taken?',
        likes: 23,
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        username: 'photographer_pro',
        text: 'Great composition! The lighting is perfect.',
        likes: 15,
        timestamp: '2024-01-15T11:15:00Z'
      }
    ],
    totalComments: 45,
    shares: 12,
    isSaved: false,
    timestamp: '2024-01-15T09:45:00Z',
    location: 'Mount Rainier National Park'
  },
  {
    id: '2',
    user: {
      username: 'sarah_wilson',
      avatar: '/woman-portrait.png',
      isVerified: false
    },
    media: [
      {
        id: '2',
        type: 'image' as const,
        url: '/professional-headshot.png',
        alt: 'Coffee shop morning vibes'
      }
    ],
    caption: 'Morning coffee and some light reading. Perfect start to the day! ☕📚',
    likes: 89,
    isLiked: true,
    comments: [
      {
        id: '3',
        username: 'coffee_addict',
        text: 'What are you reading?',
        likes: 5,
        timestamp: '2024-01-15T08:20:00Z'
      }
    ],
    totalComments: 8,
    shares: 3,
    isSaved: true,
    timestamp: '2024-01-15T07:30:00Z'
  },
  {
    id: '3',
    user: {
      username: 'mike_chen',
      avatar: '/thoughtful-man-portrait.png',
      isVerified: true
    },
    media: [
      {
        id: '3',
        type: 'image' as const,
        url: '/web-design-concept.png',
        alt: 'New project showcase'
      },
      {
        id: '4',
        type: 'image' as const,
        url: '/modern-data-dashboard.png',
        alt: 'Dashboard design'
      },
      {
        id: '5',
        type: 'image' as const,
        url: '/mobile-app-showcase.png',
        alt: 'Mobile app interface'
      }
    ],
    caption: 'Excited to share some of my latest design work! These projects have been months in the making. The first image shows our new web platform, followed by the analytics dashboard, and finally the mobile app interface. What do you think?',
    likes: 2341,
    isLiked: false,
    comments: [
      {
        id: '4',
        username: 'designer_amy',
        text: 'Incredible work! The attention to detail is amazing.',
        likes: 42,
        timestamp: '2024-01-15T14:15:00Z'
      },
      {
        id: '5',
        username: 'ui_enthusiast',
        text: 'Love the color scheme and typography choices!',
        likes: 18,
        timestamp: '2024-01-15T15:30:00Z'
      },
      {
        id: '6',
        username: 'dev_friend',
        text: 'When will these be available?',
        likes: 7,
        timestamp: '2024-01-15T16:45:00Z'
      }
    ],
    totalComments: 67,
    shares: 89,
    isSaved: false,
    timestamp: '2024-01-15T13:00:00Z'
  },
  {
    id: '4',
    user: {
      username: 'emma_travels',
      avatar: '/placeholder-user.jpg',
      isVerified: false
    },
    media: [
      {
        id: '6',
        type: 'image' as const,
        url: '/minimal-workspace.png',
        alt: 'Cozy workspace setup'
      }
    ],
    caption: 'New workspace setup complete! Productivity mode activated 🚀',
    likes: 156,
    isLiked: false,
    comments: [],
    totalComments: 12,
    shares: 5,
    isSaved: false,
    timestamp: '2024-01-14T16:20:00Z'
  }
];

interface FeedProps {
  isLoading?: boolean;
  className?: string;
}

export const Feed: React.FC<FeedProps> = ({ 
  isLoading = false, 
  className = '' 
}) => {
  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
    // In a real app, this would trigger an API call
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
    // In a real app, this would open a comment modal or navigate to post detail
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // In a real app, this would open share options
  };

  const handleSave = (postId: string) => {
    console.log('Save post:', postId);
    // In a real app, this would toggle save status via API
  };

  const handleViewAllComments = (postId: string) => {
    console.log('View all comments for post:', postId);
    // In a real app, this would navigate to post detail or open comments modal
  };

  if (isLoading) {
    return (
      <div className={`max-w-md mx-auto px-4 ${className}`}>
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    );
  }

  return (
    <div className={`py-6 border border-red-500 ${className}`}>
      {mockPosts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          user={post.user}
          media={post.media}
          caption={post.caption}
          likes={post.likes}
          isLiked={post.isLiked}
          comments={post.comments}
          totalComments={post.totalComments}
          shares={post.shares}
          isSaved={post.isSaved}
          timestamp={post.timestamp}
          location={post.location}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onSave={handleSave}
          onViewAllComments={handleViewAllComments}
        />
      ))}
    </div>
  );
};
