import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ Make sure you have this
import { FaArrowLeft, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

// Replace with your actual backend URL
// const url = 'http://localhost:5000';

// Toast Component
const AwesomeToast = ({ message, icon }) => (
  <div className='animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20'>
    <span className="text-2xl mr-3 text-[#20180E]">{icon}</span>
    <span className="font-semibold text-[#20180E]">{message}</span>
  </div>
);

const Signup = () => {
  const [showToast, setShowToast] = useState({ visible: false, message: '', icon: null });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast.visible && showToast.message === 'Sign Up Successful!') {
      const timer = setTimeout(() => {
        setShowToast({ visible: false, message: '', icon: null });
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl+`/user/register`, formData);
      console.log('Register Response:', res.data);

      if (res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        setShowToast({
          visible: true,
          message: 'Sign Up Successful!',
          icon: <FaCheckCircle />,
        });
        return;
      }
      throw new Error(res.data.message || 'Registration failed');
    } catch (err) {
      console.error('Registration Error', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setShowToast({ visible: true, message: msg, icon: <FaCheckCircle /> });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#1a120b] p-4'>
      {showToast.visible && (
        <AwesomeToast message={showToast.message} icon={showToast.icon} />
      )}

      {/* Form container */}
      <div className='w-full max-w-md bg-gradient-to-br from-[#20180E] to-[#4a372a] p-8 rounded-xl shadow-lg border border-amber-700/30'>
        <h1 className='text-3xl text-center font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform'>
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Username */}
          <div>
            <label className='text-amber-200 block mb-1'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='username'
              className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-400'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className='text-amber-200 block mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='email'
              className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-400'
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className='text-amber-200 block mb-1'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='password'
                className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-400'
                required
              />
              <span
                className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform'
          >
            Sign Up
          </button>
        </form>

        {/* Back to login link */}
        <div className='mt-6 text-center'>
          <Link
            to='/login'
            className='group inline-flex items-center text-amber-400 hover:text-amber-600 transition-all duration-300'
          >
            <FaArrowLeft className='mr-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300' />
            <span className='transform group-hover:-translate-x-2 transition-all duration-300'>
              Back To Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;