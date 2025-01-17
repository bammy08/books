import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Register = () => {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert('User registered successfully!');
    } catch (error) {
      setMessage('Please provide a valid email and password');
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Google sign in failed!');
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-10 py-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <span className="px-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                {...register('email', { required: true })}
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full py-2 px-3 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <span className="px-3  text-gray-500">
                <FaLock />
              </span>
              <input
                {...register('password', { required: true })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                className="w-full py-2 px-3 outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="px-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          {/* Register Button */}
          <div>
            <button className="w-full bg-primary hover:bg-red-800 text-white font-medium py-2 rounded-lg transition-all duration-200">
              Register
            </button>
          </div>
        </form>

        {/* Google Sign-In */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg space-x-2 transition-all duration-200"
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <p className="mt-6 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
