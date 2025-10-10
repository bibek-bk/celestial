import { updateUser } from "@/api/profile.api"
import { UpdateUserInput, User } from "@/entities/user/types"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import { profileKeys } from "./keys"
import { useAuth } from "@/shared/hooks/useAuth"


export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    const { userId } = useAuth()
    return useMutation({
        mutationFn: (input: UpdateUserInput) => updateUser(input),
        onMutate: async (newData) => {
            queryClient.cancelQueries({ queryKey: profileKeys.all })

            const previousProfile = queryClient.getQueryData(profileKeys.detail(userId))

            queryClient.setQueryData(profileKeys.detail(userId),
                (old: User) => ({ ...old, ...newData })
            )
            return { previousProfile }
        },
        onError: (err, newData, Context) => {
            queryClient.setQueryData(profileKeys.detail(userId), Context?.previousProfile)
        },
        onSettled: () => {
            //invalidating releated queries.
            queryClient.invalidateQueries({ queryKey: profileKeys.all })

        }


    })
}


