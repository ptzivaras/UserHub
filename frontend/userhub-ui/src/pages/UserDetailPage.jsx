import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';

function UserDetailPage() {
  const { id } = useParams();
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
    <div className="flex py-3 px-5 border-b border-[#45475a] last:border-b-0">
      <span className="w-36 text-[#89b4fa] font-semibold shrink-0">{label}</span>
      <span className="text-[#cdd6f4]">{value}</span>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#cdd6f4] mb-4">User Details</h2>
      <div className="bg-[#1e1e2e] rounded-lg overflow-hidden">
        <Row label="Name" value={user.name} />
        <Row label="Surname" value={user.surname} />
        <Row label="Gender" value={user.gender === 'M' ? 'Male' : 'Female'} />
        <Row label="Birthdate" value={user.birthdate} />
        <Row label="Work Address" value={user.addresses?.find(a => a.addressType === 'WORK')?.addressText || 'Not provided'} />
        <Row label="Home Address" value={user.addresses?.find(a => a.addressType === 'HOME')?.addressText || 'Not provided'} />
      </div>
      <button
        className="mt-6 py-2 px-5 rounded-md border-0 cursor-pointer text-base font-medium bg-[#45475a] text-[#cdd6f4] hover:bg-[#585b70]"
        onClick={() => window.close()}
      >
        Close Tab
      </button>
    </div>
  );
}

export default UserDetailPage;