import React from 'react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`w-80 bg-gray-900 border-r border-gray-800 p-6 ${className}`}>
      {/* User Profile Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">John Doe</h3>
            <p className="text-gray-400 text-sm">@johndoe</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-white font-bold text-lg">1.2K</div>
            <div className="text-gray-400 text-xs">Posts</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-white font-bold text-lg">15.6K</div>
            <div className="text-gray-400 text-xs">Followers</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-white font-bold text-lg">892</div>
            <div className="text-gray-400 text-xs">Following</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mb-8">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Menu</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center space-x-3 text-white hover:bg-gray-800 rounded-lg p-3 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-3 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Explore</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-3 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Favorites</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-3 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Trending Topics */}
      <div className="mb-8">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Trending</h4>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm font-medium">#Photography</span>
              <span className="text-gray-500 text-xs">2.1K posts</span>
            </div>
            <p className="text-gray-300 text-sm">Beautiful landscapes and portraits</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm font-medium">#Design</span>
              <span className="text-gray-500 text-xs">1.8K posts</span>
            </div>
            <p className="text-gray-300 text-sm">UI/UX inspiration and tips</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm font-medium">#Travel</span>
              <span className="text-gray-500 text-xs">3.2K posts</span>
            </div>
            <p className="text-gray-300 text-sm">Adventure and exploration</p>
          </div>
        </div>
      </div>

      {/* Suggested Users */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Suggested</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">U{i}</span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">User {i}</div>
                  <div className="text-gray-400 text-xs">@user{i}</div>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};


