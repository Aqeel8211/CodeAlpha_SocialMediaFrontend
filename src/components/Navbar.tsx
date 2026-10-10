import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        <Link to="/feed" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            S
          </div>
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
            SocialMedia
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/search"
            className="px-2.5 sm:px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            Search
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1 sm:px-2 sm:py-1.5 hover:bg-gray-100 rounded-lg"
              >
                <UserAvatar username={user.username} size="sm" />
                <span className="text-sm text-gray-700 font-medium hidden sm:block">
                  {user.username}
                </span>
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                    <Link
                      to={`/profile/${user.userId}`}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/edit-profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;