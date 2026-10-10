import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchUsers } from '../hooks/useUser';
import UserAvatar from '../components/UserAvatar';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { data: users, isLoading } = useSearchUsers(query);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Users</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username..."
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 mb-4 bg-white shadow-sm"
      />

      {isLoading && query.trim() && (
        <p className="text-sm text-gray-500 text-center py-4">Searching...</p>
      )}

      {users && users.length === 0 && query.trim() && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-gray-500 text-sm">No users found.</p>
        </div>
      )}

      {users && users.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden shadow-sm">
          {users.map((user) => (
            <Link
              key={user.id}
              to={`/profile/${user.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
            >
              <UserAvatar
                username={user.username}
                profilePictureUrl={user.profilePictureUrl}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{user.username}</p>
                {user.bio && (
                  <p className="text-xs text-gray-500 truncate">{user.bio}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;