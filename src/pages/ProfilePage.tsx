import { useParams, Link } from 'react-router-dom';
import { useProfile } from '../hooks/useUser';
import { useUserPosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import UserAvatar from '../components/UserAvatar';
import FollowButton from '../components/FollowButton';
import PostCard from '../components/PostCard';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { user: currentUser } = useAuth();

  const { data: profile, isLoading: profileLoading, isError } = useProfile(userId);
  const { data: posts, isLoading: postsLoading } = useUserPosts(userId);

  const isOwnProfile = currentUser?.userId === userId;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {profileLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 animate-pulse mb-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl text-center">
          User not found.
        </div>
      )}

      {profile && (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <UserAvatar
                username={profile.username}
                profilePictureUrl={profile.profilePictureUrl}
                size="lg"
              />

              <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                    {profile.username}
                  </h1>

                  {isOwnProfile ? (
                    <Link
                      to="/edit-profile"
                      className="px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 inline-block"
                    >
                      Edit Profile
                    </Link>
                  ) : (
                    <div className="flex justify-center sm:justify-start">
                      <FollowButton
                        userId={profile.id}
                        isFollowing={profile.isFollowedByCurrentUser}
                      />
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                  {profile.email}
                </p>

                {profile.bio && (
                  <p className="text-sm text-gray-700 mt-2 break-words">
                    {profile.bio}
                  </p>
                )}

                <div className="flex justify-center sm:justify-start gap-5 sm:gap-6 mt-3 text-sm">
                  <div>
                    <span className="font-bold text-gray-800">
                      {profile.postsCount}
                    </span>{' '}
                    <span className="text-gray-500">Posts</span>
                  </div>

                  <Link
                    to={`/profile/${profile.id}/followers`}
                    className="hover:underline"
                  >
                    <span className="font-bold text-gray-800">
                      {profile.followersCount}
                    </span>{' '}
                    <span className="text-gray-500">Followers</span>
                  </Link>

                  <Link
                    to={`/profile/${profile.id}/following`}
                    className="hover:underline"
                  >
                    <span className="font-bold text-gray-800">
                      {profile.followingCount}
                    </span>{' '}
                    <span className="text-gray-500">Following</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <h2 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
            Posts
          </h2>

          {postsLoading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-500 text-sm">No posts yet.</p>
            </div>
          )}

          {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </>
      )}
    </div>
  );
};

export default ProfilePage;