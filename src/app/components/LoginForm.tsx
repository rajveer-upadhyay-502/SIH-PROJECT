'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const user = data.user;

        login({
          _id: user._id, // <-- Important! Add this to match your AuthContext user type
          name: user.name,
          email: user.email,
          role: user.role || '',
          collegeId: user.collegeId || '',
        });

        setMessage('✅ Login successful!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setMessage(`❌ ${data.message || 'Invalid credentials'}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-10 border border-gray-700 rounded-xl shadow-xl bg-gray-900 text-white mb-25"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-green-500 font-serif">
        Login
      </h2>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full text-lg p-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      {/* Password + Eye Icon */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full text-lg p-4 pr-14 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-lg py-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Feedback Message */}
      {message && (
        <p
          className={`mt-3 text-center text-base ${
            message.startsWith('✅') ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}

      {/* Register Link */}
      <p className="mt-8 text-md text-center text-gray-400">
        New to EduManage?{' '}
        <Link
          href="/contact"
          className="text-blue-400 hover:underline hover:text-blue-300"
        >
          contact us
        </Link>
      </p>
    </form>
  );
}
