import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyProfile, useUpdateMyProfile } from '../hooks/useUser';
import UserAvatar from '../components/UserAvatar';

const EditProfilePage = () => {
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateMyProfile();
  const navigate = useNavigate();

  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || '');
      setProfilePictureUrl(profile.profilePictureUrl || '');
    }
  }, [profile]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    updateProfile.mutate(
      {
        bio: bio.trim() || null,
        profilePictureUrl: profilePictureUrl.trim() || null,
      },
      {
        onSuccess: () => {
          navigate(`/profile/${profile?.id}`);
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Failed to update profile.');
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>

      {isLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {profile && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <UserAvatar
              username={profile.username}
              profilePictureUrl={profilePictureUrl || profile.profilePictureUrl}
              size="lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={profile.username}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Username cannot be changed.</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{bio.length} / 200</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <p className="text-xs text-gray-400 mt-1">
              Try: https://i.pravatar.cc/150?img=12
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`/profile/${profile.id}`)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfilePage;