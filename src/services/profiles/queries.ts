import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/api/profile.api';
import { profileKeys } from './keys';

export function useProfileQuery(userId: string) {
  return useQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
}
