import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/components/ui/Sidebar';

export function AuthenticatedLayout(): React.JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full bg-black">
      <div className="flex w-full">
        <div className="px-6 h-screen hidden md:block">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full justify-start py-8 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


