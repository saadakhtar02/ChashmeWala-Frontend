import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email format is invalid";
    }
    
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 4) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login',
        { email, password },
        {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = response.data;
      
      if (data.token) {
        localStorage.setItem('token', data.token);

        navigate('/AdminDashboard');
      } else {
        setApiError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.response?.data?.message || 'Unable to connect to backend server. Check server running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset configuration: Contact your lead systems administrator to reset DB values.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-gold/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px]" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <span className="font-outfit font-extrabold text-3xl tracking-widest text-gradient-gold">
            CASHMEWALA
          </span>
          <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-gradient-premium">
            Admin Portal Access
          </h2>
          <p className="mt-2 text-center text-xs text-muted tracking-wider uppercase font-semibold font-sans">
            Authorized Personnel Only
          </p>
        </div>

        <div className="glass-card rounded-2xl border border-gray-200/80 shadow-xl p-8 sm:p-10 relative z-10 font-sans">
          {apiError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/25 rounded-lg text-sm text-red-500 flex items-start gap-2.5">
              <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold text-gray-600 uppercase tracking-widest text-left mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-white/80 border ${
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-gold'
                  } rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-colors`}
                  placeholder="admin@cashmewala.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 text-left flex items-center gap-1">
                  <FiAlertCircle /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase tracking-widest text-left">
                  Password
                </label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-11 py-3.5 bg-white/80 border ${
                    errors.password ? 'border-red-500' : 'border-gray-200 focus:border-gold'
                  } rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  tabIndex="-1"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 text-left flex items-center gap-1">
                  <FiAlertCircle /> {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-bold text-gold hover:text-gold-hover transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold hover:bg-gold-hover disabled:bg-gray-300 text-white font-outfit font-semibold text-sm rounded shadow-lg shadow-gold/20 hover:shadow-gold-hover/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
