import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  username: string;
  avatar: string | null;
  id: string;
}

export default function UserMenu() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('discord_user');
    if (userData) {
      try {
        const user: User = JSON.parse(userData);
        setUserName(user.username || 'User');
        if (user.avatar) {
          setUserAvatar(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }

    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-user-menu]')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Clear all auth data
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user');
    localStorage.removeItem('discord_refresh_token');
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="relative" data-user-menu>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-aqua to-accent-blue flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-aqua/50 transition-all hover:scale-110"
        title={userName}
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-full h-full rounded-full object-cover border-2 border-aqua"
          />
        ) : (
          <span className="text-xl">{userName.charAt(0).toUpperCase()}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute bottom-full mb-2 right-0 w-48 bg-gray-900 border border-red-500/50 rounded-xl shadow-2xl shadow-red-500/20 overflow-hidden animate-fadeIn">
          <button
            onClick={() => {
              handleLogout();
              setShowMenu(false);
            }}
            className="w-full px-4 py-3 text-red-400 hover:bg-red-500/20 flex items-center gap-3 font-bold transition-colors text-left"
          >
            <img 
              src="/logout-icon.png" 
              alt="logout" 
              className="w-5 h-5"
            />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
