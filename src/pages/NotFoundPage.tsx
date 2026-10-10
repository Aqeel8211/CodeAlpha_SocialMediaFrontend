import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <Link
          to="/feed"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Go to Feed
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;