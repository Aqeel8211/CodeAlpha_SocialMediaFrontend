import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SocialMedia
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 text-sm text-gray-500">
            <Link to="/feed" className="hover:text-blue-600">
              Feed
            </Link>
            <Link to="/search" className="hover:text-blue-600">
              Search
            </Link>
            <a
              href="https://www.codealpha.tech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              CodeAlpha
            </a>
          </div>

          <p className="text-xs text-gray-400 text-center sm:text-right">
            © {year} SocialMedia · Built with React + .NET
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;