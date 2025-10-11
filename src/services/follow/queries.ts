import { followApi } from "@/api/follow.api"
import { useQuery } from "@tanstack/react-query"

export const useIsFollowing = (userId: string) => {
    return useQuery({
        queryKey: ['is-following', userId],
        queryFn: () => followApi.isFollowing(userId),
        staleTime: 10 * 1000 ,//  second
        gcTime: 15 *1000
    })
}