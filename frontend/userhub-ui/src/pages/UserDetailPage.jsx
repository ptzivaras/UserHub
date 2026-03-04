import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/userService';

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await getUserById(id, { signal: controller.signal });
        setUser(response.data);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          if (err.response?.status === 404) {
            setError('This user no longer exists.');
          } else {
            setError('Failed to load user details. Please try again.');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [id]);

  if (loading) return (
    <div className="max-w-xl mx-auto p-4">
      <p className="text-[#cdd6f4]">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto p-4">
      <div className="py-3 px-4 rounded-md bg-[#3b1219] text-[#f38ba8] border border-[#f38ba8]">{error}</div>
    </div>
  );

  if (!user) return (
    <div className="max-w-xl mx-auto p-4">
      <p className="text-[#cdd6f4]">No data found.</p>
    </div>
  );

  const Row = ({ label, value }) => (
    <div className="flex py-4 px-6 border-b border-[#313244] last:border-b-0 hover:bg-[#24243a] transition-colors">
      <span className="w-40 text-[#89b4fa] font-semibold shrink-0">{label}</span>
      <span className="text-[#cdd6f4] font-medium">{value}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <button
        onClick={() => navigate('/users')}
        className="mb-6 py-2 px-4 rounded-lg border-0 cursor-pointer text-sm font-medium bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-[#cdd6f4] mb-8">User Details</h2>
      <div className="bg-[#1e1e2e] rounded-2xl overflow-hidden border border-[#313244] shadow-lg">
        <Row label="Name" value={user.name} />
        <Row label="Surname" value={user.surname} />
        <Row label="Gender" value={user.gender === 'M' ? 'Male' : 'Female'} />
        <Row label="Birthdate" value={user.birthdate} />
        <Row label="Work Address" value={user.addresses?.find(a => a.addressType === 'WORK')?.addressText || 'Not provided'} />
        <Row label="Home Address" value={user.addresses?.find(a => a.addressType === 'HOME')?.addressText || 'Not provided'} />
      </div>

    </div>
  );
}

export default UserDetailPage;