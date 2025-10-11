import React from 'react';
import { PostCard } from '@/entities/post/components/PostCard';
import { SkeletonPost } from '@/entities/post/components/SkeletonPost';
import { useGetAllPosts } from '@/services/posts/queries';

interface FeedProps {
  className?: string;
}

export const Feed: React.FC<FeedProps> = ({ className = '' }) => {
  const { data: posts, isLoading, error } = useGetAllPosts();

  if (isLoading) {
    return (
      <div className={`max-w-md mx-auto px-4 py-4 sm:py-6 ${className}`}>
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`max-w-md mx-auto px-4 py-6 sm:py-8 text-center ${className}`}>
        <p className="text-red-500">Failed to load posts</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={`max-w-md mx-auto px-4 py-6 sm:py-8 text-center ${className}`}>
        <p className="text-gray-500">No posts yet. Be the first to share!</p>
      </div>
    );
  }
console.log(posts)
  return (
    <div className={`py-4 sm:py-6 px-4 sm:px-0 flex flex-col items-center ${className}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          user={{
            username: post.profiles?.username || 'Unknown User',
            avatar: post.profiles?.avatar_url || '/placeholder-user.jpg',
            isVerified: false
          }}
          media={[
            {
              id: post.id,
              type: 'image' as const,
              url: post.image_url,
              alt: post.caption
            }
          ]}
          caption={post.caption}
          likes={undefined}
          isLiked={undefined}
          comments={[]}
          totalComments={0}
          shares={0}
          isSaved={false}
          timestamp={post.created_at}
          location={undefined}
        />
      ))}
    </div>
  );
};