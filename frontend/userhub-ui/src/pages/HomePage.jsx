import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();
    return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10 text-center px-4">
      <div>
        <h1 className="text-4xl font-bold text-[#cdd6f4] mb-3">User Management</h1>
        <p className="text-[#6c7086] text-lg">Manage your users — view, register, and delete records.</p>
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        <button
          onClick={() => navigate('/users')}
          className="w-52 py-6 px-6 bg-[#1e1e2e] border border-[#45475a] rounded-xl text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#1e1e2e] transition-all cursor-pointer flex flex-col items-center gap-3 group"
        >
          <span className="text-base font-semibold group-hover:text-[#89b4fa] transition-colors">Display Users</span>
          <span className="text-xs text-[#6c7086]">View and manage all users</span>
        </button>
        <button
          onClick={() => navigate('/register')}
          className="w-52 py-6 px-6 bg-[#1e1e2e] border border-[#45475a] rounded-xl text-[#cdd6f4] hover:border-[#a6e3a1] hover:bg-[#1e1e2e] transition-all cursor-pointer flex flex-col items-center gap-3 group"
        >
          <span className="text-base font-semibold group-hover:text-[#a6e3a1] transition-colors">Register User</span>
          <span className="text-xs text-[#6c7086]">Add a new user to the system</span>
        </button>
      </div>
    </div>
    );
}
export default HomePage;