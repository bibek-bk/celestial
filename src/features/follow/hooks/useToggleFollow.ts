import { useFollowUserMutation, useUnFollowUserMutation } from "@/services/follow/mutations"
import { useIsFollowing } from "@/services/follow/queries"

export const useToggleFollow = (userId : string)=>{
    const followUser = useFollowUserMutation()
    const unFollowUser  = useUnFollowUserMutation()
    const isFollowingQuery = useIsFollowing(userId)
    const isPending = followUser.isPending || unFollowUser.isPending

    console.log(isFollowingQuery.data,'from useToggleFollow , ')

    const toggleFollow = async() =>{
        console.log('hi im toggled');
        
       try {
        if(isFollowingQuery.data){
            await  unFollowUser.mutateAsync(userId)
        }else{
            await followUser.mutateAsync(userId)
        }
       } finally {
        console.log('finnaly')
       }
    }

    return {
        toggleFollow,
        isFollowing: isFollowingQuery.data || false,
        isPending: isPending || isFollowingQuery.isLoading
    }

}