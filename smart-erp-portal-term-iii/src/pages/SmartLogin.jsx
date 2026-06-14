import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ParticlesBackground from '../components/erp/ParticlesBackground';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const SmartLogin = () => {
  const navigate = useNavigate();
  const { login, auth } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="absolute inset-0 bg-navy-purple/40 backdrop-blur-[2px]" />

      <div className="w-full max-w-md p-8 glass-card bg-navy-purple-light/80 relative z-10 m-4"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden p-1"
          >
            <img src="https://plain-apac-prod-public.komododecks.com/202605/22/IHRQzXDMaTRe22mGudhd/image.png" alt="SmartClass Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-orbitron font-bold text-gradient-primary mb-2">SmartClass</h2>
          <p className="text-gray-400 font-inter text-sm">Secure Admin Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-[38px] text-gray-400" size={18} />
              <GlassInput 
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartclass.edu"
                required
              />
              <div className="absolute left-3 top-[38px] text-neon-blue bg-white/0" style={{pointerEvents: 'none'}} />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-[38px] text-gray-400" size={18} />
              <GlassInput 
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-neon-pink text-sm font-medium text-center bg-neon-pink/10 py-2 rounded-md border border-neon-pink/20"
              >
                {error}
              </motion.p>
            )}
          

          <NeonButton 
            type="submit" 
            className="w-full h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div>
                <Loader2 size={24} />
              </div>
            ) : (
              'Authenticate'
            )}
          </NeonButton>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 font-inter">
          <p>Demo Credentials:</p>
          <p className="mt-1">admin@smartclass.edu / admin123</p>
        </div>
      </div>
    </div>
  );
};

// Fix AnimatePresence usage
import { AnimatePresence } from 'framer-motion';

export default SmartLogin;
