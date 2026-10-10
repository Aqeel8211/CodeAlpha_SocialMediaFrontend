import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import PostDetailPage from './pages/PostDetailPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import EditProfilePage from './pages/EditProfilePage';
import FollowListPage from './pages/FollowListPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/:type" element={<FollowListPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;