import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createUser } from '../services/userService';

const emptyForm = {
  name: '',
  surname: '',
  gender: '',
  birthdate: null,
  workAddress: '',
  homeAddress: '',
};

function RegisterUserPage() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = 'Name is required.';
    if (!form.surname.trim())  e.surname  = 'Surname is required.';
    if (!form.gender)          e.gender   = 'Gender is required.';
    if (!form.birthdate)       e.birthdate = 'Birthdate is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, birthdate: date }));
    setErrors((prev) => ({ ...prev, birthdate: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const addresses = [];
    if (form.workAddress.trim()) addresses.push({ addressType: 'WORK', addressText: form.workAddress.trim() });
    if (form.homeAddress.trim()) addresses.push({ addressType: 'HOME', addressText: form.homeAddress.trim() });

    const payload = {
      name: form.name.trim(),
      surname: form.surname.trim(),
      gender: form.gender,
      birthdate: form.birthdate.toISOString().split('T')[0],
      addresses,
    };

    try {
      setSubmitting(true);
      await createUser(payload);
      navigate('/users');
    } catch (err) {
      console.error(err);
      setApiError('Failed to register user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full py-2 px-3 rounded-md border ${hasError ? 'border-[#f38ba8]' : 'border-[#45475a]'} bg-[#313244] text-[#cdd6f4] text-base focus:outline-none focus:border-[#89b4fa]`;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 rounded-lg border-0 cursor-pointer text-sm font-medium bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-[#cdd6f4] m-0">Register New User</h2>
      </div>

      {apiError && (
        <div className="py-3 px-5 rounded-lg mb-6 bg-[#3b1219] text-[#f38ba8] border border-[#f38ba8]">{apiError}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#1e1e2e] p-10 rounded-2xl border border-[#313244] shadow-lg" noValidate>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[#cdd6f4]">Name *</label>
            <input id="name" type="text" name="name" value={form.name} onChange={handleChange} className={inputClass(errors.name)} />
            <span className="text-[#f38ba8] text-xs h-4 block">{errors.name || ''}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="surname" className="text-sm font-medium text-[#cdd6f4]">Surname *</label>
            <input id="surname" type="text" name="surname" value={form.surname} onChange={handleChange} className={inputClass(errors.surname)} />
            <span className="text-[#f38ba8] text-xs h-4 block">{errors.surname || ''}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="text-sm font-medium text-[#cdd6f4]">Gender *</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} className={inputClass(errors.gender)}>
              <option value="">-- Select --</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <span className="text-[#f38ba8] text-xs h-4 block">{errors.gender || ''}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="text-sm font-medium text-[#cdd6f4]">Birthdate *</label>
            <DatePicker
              id="birthdate"
              selected={form.birthdate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              wrapperClassName="w-full"
              className={inputClass(errors.birthdate)}
            />
            <span className="text-[#f38ba8] text-xs h-4 block">{errors.birthdate || ''}</span>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="workAddress" className="text-sm font-medium text-[#cdd6f4] block mb-2">Work Address</label>
          <textarea id="workAddress" name="workAddress" value={form.workAddress} onChange={handleChange} rows={3} className={inputClass(false)} />
        </div>

        <div className="mb-8">
          <label htmlFor="homeAddress" className="text-sm font-medium text-[#cdd6f4] block mb-2">Home Address</label>
          <textarea id="homeAddress" name="homeAddress" value={form.homeAddress} onChange={handleChange} rows={3} className={inputClass(false)} />
        </div>

        <div className="flex gap-4 justify-end pt-6 border-t border-[#313244]">
          <button type="button" className="py-2.5 px-6 rounded-lg border-0 cursor-pointer text-base font-medium bg-[#45475a] text-[#cdd6f4] hover:bg-[#585b70] transition-colors" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="py-2.5 px-6 rounded-lg border-0 cursor-pointer text-base font-medium bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#b4d0fb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed" disabled={submitting}>
            {submitting ? 'Registering...' : 'Register User'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default RegisterUserPage;