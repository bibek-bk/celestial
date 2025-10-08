import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ComingSoon } from '@/shared/components/ui/ComingSoon';

export default function MessagesComingSoon(): React.JSX.Element {
  return (
    <ComingSoon
      title="Messages are coming soon"
      description="Direct messages will arrive soon. Stay tuned!"
      icon={MessageCircle}
    />
  );
}


