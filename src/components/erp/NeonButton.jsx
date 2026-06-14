import React from 'react';

const NeonButton = ({ children, variant = 'primary', onClick, type = 'button', className = '', disabled = false }) => {
  const baseClasses = "relative px-6 py-2 font-inter font-medium rounded-lg overflow-hidden transition-all flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-white/5 text-white border border-neon-purple/50 shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:border-neon-purple",
    danger: "bg-white/5 text-white border border-neon-pink/50 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:border-neon-pink",
    success: "bg-white/5 text-white border border-neon-green/50 shadow-[0_0_10px_rgba(52,211,153,0.2)] hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] hover:border-neon-green",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default NeonButton;
