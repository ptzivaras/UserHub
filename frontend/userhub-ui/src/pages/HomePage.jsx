import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();
    return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-16 text-center px-8 py-20">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-[#cdd6f4] mb-6">User Management</h1>
        <p className="text-[#a6adc8] text-lg leading-relaxed">Manage your users — view, register, and delete users.</p>
      </div>
      <div className="grid grid-cols-2 gap-10 max-w-3xl w-full">
        <button
          onClick={() => navigate('/users')}
          className="py-10 px-8 bg-[#1e1e2e] border-2 border-[#45475a] rounded-2xl text-[#cdd6f4] hover:border-[#89b4fa] hover:bg-[#252535] hover:shadow-xl transition-all cursor-pointer flex flex-col items-center gap-3 group"
        >
          <span className="text-xl font-semibold group-hover:text-[#89b4fa] transition-colors">Display Users</span>
          <span className="text-sm text-[#6c7086] group-hover:text-[#a6adc8] transition-colors">View and manage all users</span>
        </button>
        <button
          onClick={() => navigate('/register')}
          className="py-10 px-8 bg-[#1e1e2e] border-2 border-[#45475a] rounded-2xl text-[#cdd6f4] hover:border-[#a6e3a1] hover:bg-[#252535] hover:shadow-xl transition-all cursor-pointer flex flex-col items-center gap-3 group"
        >
          <span className="text-xl font-semibold group-hover:text-[#a6e3a1] transition-colors">Register User</span>
          <span className="text-sm text-[#6c7086] group-hover:text-[#a6adc8] transition-colors">Add a new user to the system</span>
        </button>
      </div>
    </div>
    );
}
export default HomePage;