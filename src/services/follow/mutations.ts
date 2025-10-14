import { followApi } from "@/api/follow.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profileKeys } from "../profiles/keys"
import { User } from "@/entities/user/types"
import { useAuth } from "@/shared/hooks/useAuth"
import { useToast } from '@/shared/hooks/useToast'


export const useFollowUserMutation = () => {
    const queryClient = useQueryClient()
    const { userId: currentUserId } = useAuth()
    const { success, error } = useToast()

    return useMutation({
        mutationFn: (userId: string) => followApi.followUser(userId),
        onMutate: async (userId: string) => {
            // Cancel queries to prevent race conditions
            await queryClient.cancelQueries({ queryKey: ['is-following', userId] })
            await queryClient.cancelQueries({ queryKey: profileKeys.detail(userId) })

            // Snapshot previous values for rollback
            const previousFollowStatus = queryClient.getQueryData(['is-following', userId])
            const previousProfile = queryClient.getQueryData<User>(profileKeys.detail(userId))

            // Optimistic update 1: Update following status immediately
            queryClient.setQueryData(['is-following', userId], true)

            // Optimistic update 2: Increment follower count
            // queryClient.setQueryData<User>(
            //     profileKeys.detail(userId),
            //     (old: User | undefined) => 
            //         old ? { ...old, followers_count: old.followers_count + 1 } : undefined
            // )

            // Return context for rollback
            return {
                 previousFollowStatus,
                  previousProfile
                 }
        },

        onError: (err, userId, context) => {
            error(
                'Failed to follow user',
                `${err}`
            )
            
            // Rollback on error
            if (context?.previousFollowStatus !== undefined) {
                queryClient.setQueryData(['is-following', userId], context.previousFollowStatus)
            }
            // if (context?.previousProfile !== undefined) {
            //     queryClient.setQueryData(profileKeys.detail(userId), context.previousProfile)
            // }
        },

        onSuccess: (data, userId) => {
            const profile = queryClient.getQueryData<User>(profileKeys.detail(userId))

            success(
                'Successfully followed!',
                profile?.username || 'this user'
            )
        },

        onSettled: (data, err, userId) => {
            // Sync with server by invalidating related queries
            queryClient.invalidateQueries({ queryKey: ['is-following', userId] })
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(currentUserId || '') })
        }
    })
}


export const useUnFollowUserMutation = () => {
    const queryClient = useQueryClient()
    const { userId: currentUserId } = useAuth()
    const { success, error } = useToast()
    
    return useMutation({
        mutationFn: (userId: string) => followApi.unFollowUser(userId),
        onMutate: async (userId: string) => {
            // Cancel queries to prevent race conditions
            await queryClient.cancelQueries({ queryKey: ['is-following', userId] })
            await queryClient.cancelQueries({ queryKey: profileKeys.detail(userId) })

            // Snapshot previous data for rollback
            const previousFollowStatus = queryClient.getQueryData(['is-following', userId])
            const previousProfile = queryClient.getQueryData<User>(profileKeys.detail(userId))

            // Optimistic update 1: Update following status immediately
            // queryClient.setQueryData(['is-following', userId], false)

            // Optimistic update 2: Decrement follower count
            // queryClient.setQueryData<User>(
            //     profileKeys.detail(userId),
            //     (old: User | undefined) => 
            //         old ? { ...old, followers_count: old.followers_count - 1 } : undefined
            // )

            return { previousFollowStatus, previousProfile }
        },

        onError: (err, userId, context) => {
            error(
                'Failed to unfollow user',
                'Something went wrong. Please try again.'
            )
            
            // Rollback on error
            // if (context?.previousFollowStatus !== undefined) {
            //     queryClient.setQueryData(['is-following', userId], context.previousFollowStatus)
            // }
            // if (context?.previousProfile !== undefined) {
            //     queryClient.setQueryData(profileKeys.detail(userId), context.previousProfile)
            // }
        },

        onSuccess: (data, userId) => {
            const profile = queryClient.getQueryData<User>(profileKeys.detail(userId))

            success(
                'Successfully unfollowed!',
                profile?.username || 'this user'
            )
        },

        onSettled: (data, err, userId) => {
            // Sync with server by invalidating related queries
            queryClient.invalidateQueries({ queryKey: ['is-following', userId] })
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(currentUserId || '') })
        }
    })
}