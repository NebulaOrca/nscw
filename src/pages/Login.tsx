import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUsers } from '../utils/github';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = await getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2F3136] to-[#36393F] flex items-center justify-center px-4">
      <div className="bg-[#2F3136] p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <img
              src="https://pomf2.lain.la/f/b4k5if9w.png"
              alt="SCode Logo"
              className="w-10 h-10"
            />
            <Code2 className="text-[#5865F2]" size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#40444B] text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#40444B] text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-semibold transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
};