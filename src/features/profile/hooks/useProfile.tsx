
import { useProfileQuery } from '@/services/profiles/queries';
// import { useUpdateProfile } from '@/services/profiles/mutations';

export function useProfile(userId: string) {
  const profileQuery = useProfileQuery(userId);
//   const updateMutation = useUpdateProfile();

//   const handleUpdateProfile = (input: UpdateProfileInput) => {
//     updateMutation.mutate(input, {
//       onSuccess: () => {
//         console.log('Profile updated!');
//       },
//       onError: (error) => {
//         console.error('Failed to update:', error);
//       },
//     });
//   };

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    // handleUpdateProfile,
    // isUpdating: updateMutation.isPending,
  };
}