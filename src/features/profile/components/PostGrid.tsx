interface Post {
  id: string
  image?: string
  title?: string
  likes?: number
  comments?: number
}

interface PostGridProps {
  posts?: Post[]
}

export function PostGrid({ posts = [] }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-muted-foreground">No posts yet</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {posts.map((post) => (
        <div key={post.id} className="group cursor-pointer">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {post.image ? (
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title || "Post"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
          </div>
          {post.title && (
            <div className="mt-2">
              <h3 className="font-medium text-foreground truncate text-sm sm:text-base">{post.title}</h3>
              <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                {post.likes && <span>{post.likes} likes</span>}
                {post.comments && <span>{post.comments} comments</span>}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
