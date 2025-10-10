import { followApi } from "@/api/follow.api"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import { profileKeys } from "../profiles/keys"
import { User } from "@/entities/user/types"


export const useFollowUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (userId: string) => followApi.followUser(userId),
        onMutate: async (userId: string) => {
            //Cancel  to prevent race conditons

            //without canceling
            //Time 0: User clicks Follow
            // Time 1: Optimistic update sets isFollowing = true
            // Time 2: Background refetch starts(from staleTime)
            // Time 3: Refetch returns OLD data(isFollowing = false) ← OVERWRITES optimistic update!
            // Time 4: Server mutation completes(isFollowing = true)

            await queryClient.cancelQueries({ queryKey: ['is-following', userId] })


            //snapshots previous value for rollback in case of error

            const previousFollowStatus = queryClient.getQueryData(['is-following', userId]) //profile doesn't have the isFollowing status
            const previousProfile = queryClient.getQueryData<User>(profileKeys.detail(userId))  // profile has follower and following counts


            //optimistic 1, updates the following status -- happen before server response and gives better UX
            queryClient.setQueryData(['is-following', userId], true) // userId = followingId

            //optimistic 2, update the follow-count
            queryClient.setQueryData<User>(profileKeys.detail(userId),
                (old: User | undefined) => old ? { ...old, followers_count: old.followers_count } : undefined
            );

            // Return Context(prevous Values)
            return { previousFollowStatus, previousProfile }
        },

        onError: (err, userId, Context) => {
            //rollback on error
            if (Context?.previousFollowStatus !== undefined) {
                queryClient.setQueryData(['is-following', userId], Context.previousFollowStatus)
            }
            if (Context?.previousProfile !== undefined) {
                queryClient.setQueryData(profileKeys.detail(userId), Context.previousProfile)
            }

        },
        onSettled: (data, err, userId) => {
            // always sync with server by invalidateing related data (succes or error)
            queryClient.invalidateQueries({ queryKey: ['is-following', userId] })
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
        }
    })
}


export const useUnFollowUserMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (userId: string) => followApi.unFollowUser(userId),
        onMutate: async (userId: string) => {

            //cancel queries to prevent race conditions
            await queryClient.cancelQueries({ queryKey: ['is-following', userId] })

            // Snapshots previous data
            const previousFollowStatus = queryClient.getQueryData(['is-following', userId]) // for rollback unfollow if fails
            const previousProfile = queryClient.getQueryData(profileKeys.detail(userId))  // to rollback profile if fails


            //optimistic 1, updates the following status -- happen before server response and gives better UX
            queryClient.setQueryData(['is-following', userId], false) // userId = followingId

            //optimistic 2, updating the follower count(of following-user) of profile
            queryClient.setQueryData<User>(profileKeys.detail(userId),//always check the shape of data: 
                (old: User | undefined) => old ? { ...old, followers_count: old.followers_count - 1 } : undefined
            );

            return { previousFollowStatus, previousProfile }
        },
        onError: (err, userId, Context) => {
            //rollback
            if (Context?.previousFollowStatus !== undefined) {
                queryClient.setQueryData(['is-following', userId], Context.previousFollowStatus)
            }
            if (Context?.previousProfile !== undefined) {
                queryClient.setQueryData(profileKeys.detail(userId), Context.previousProfile) //set's to previous state
            }
        },
        onSettled: (data, err, userId) => {
            // to keep sync with server - always invalidate the queries
            queryClient.invalidateQueries({ queryKey: ['is-following', userId] })
            queryClient.invalidateQueries({ queryKey : profileKeys.detail(userId) })
        }

    })
}

