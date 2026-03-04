import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterUserPage from './pages/RegisterUserPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailPage from './pages/UserDetailPage';

function Navbar() {
  const location = useLocation();
  const linkClass = (path) =>
    `no-underline text-sm font-medium px-4 py-2 rounded-md transition-colors ${
      location.pathname === path
        ? 'bg-[#89b4fa] text-[#1e1e2e]'
        : 'text-[#cdd6f4] hover:bg-[#313244]'
    }`;

  return (
    <nav className="w-full bg-[#1e1e2e] border-b border-[#313244] sticky top-0 z-[100] shadow-md">
      <div className="w-full px-8 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-[#89b4fa] no-underline tracking-wide">
          👤 User Management
        </Link>
        <div className="flex gap-2">
          <Link to="/users" className={linkClass('/users')}>Display Users</Link>
          <Link to="/register" className={linkClass('/register')}>Register User</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
