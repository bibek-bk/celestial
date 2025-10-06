import React, { useCallback, useMemo, useState } from 'react';
import { Home, Search, MessageCircle, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { signOut } from '@/services/auth';

export function Sidebar() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const menuItems = useMemo(() => ([
    { icon: Home, label: 'Home', id: 'home', onClick: () => navigate('/') },
    { icon: Search, label: 'Search', id: 'search', onClick: () => {} },
    { icon: MessageCircle, label: 'Messages', id: 'messages', onClick: () => {} },
    { icon: User, label: 'Profile', id: 'profile', onClick: () => { if (userId) navigate(`/profile/${userId}`); } },
  ]), [navigate, userId]);

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/login');
    } finally {
      setIsSigningOut(false);
    }
  }, [navigate, isSigningOut]);

  return (
    <div className="w-64 bg-[var(--color-background)] border-r border-[var(--color-border)] flex flex-col p-6 sticky top-0 h-screen">
      {/* App Name */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          celestial
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl bg-transparent hover:bg-[var(--color-muted)] transform hover:translate-x-1 transition-all duration-300 ease-out group cursor-pointer"
          >
            <item.icon className="w-6 h-6 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors duration-300" />
            <span className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] font-medium transition-colors duration-300">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-muted)] hover:border-[var(--color-border-strong)] transform hover:translate-x-1 transition-all duration-300 ease-out group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LogOut className="w-6 h-6  text-[var(--color-muted-foreground)] group-hover:text-red-500 transition-colors duration-300" />
          <span className="text-[var(--color-muted-foreground)] group-hover:text-red-500 font-medium transition-colors duration-300">
            {isSigningOut ? 'Signing out…' : 'Sign Out'}
          </span>
        </button>
      </div>
    </div>
  );
}

