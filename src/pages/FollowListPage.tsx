import { useParams, Link } from 'react-router-dom';
import { useFollowers, useFollowing } from '../hooks/useFollow';
import UserAvatar from '../components/UserAvatar';

const FollowListPage = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const userId = Number(id);
  const isFollowers = type === 'followers';

  const { data: followers, isLoading: followersLoading } = useFollowers(
    isFollowers ? userId : 0
  );
  const { data: following, isLoading: followingLoading } = useFollowing(
    !isFollowers ? userId : 0
  );

  const users = isFollowers ? followers : following;
  const isLoading = isFollowers ? followersLoading : followingLoading;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link
        to={`/profile/${userId}`}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to profile
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {isFollowers ? 'Followers' : 'Following'}
      </h1>

      {isLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && users && users.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">👥</div>
          <p className="text-gray-500 text-sm">
            {isFollowers ? 'No followers yet.' : 'Not following anyone yet.'}
          </p>
        </div>
      )}

      {!isLoading && users && users.length > 0 && (
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
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowListPage;