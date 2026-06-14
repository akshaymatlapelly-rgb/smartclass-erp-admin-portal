import React from 'react';

const StatCard = ({ title, value, icon: Icon, glowColor = 'neon-purple' }) => {
  const glowStyles = {
    'neon-purple': 'shadow-[0_0_15px_rgba(139,92,246,0.15)] border-neon-purple/30',
    'neon-blue': 'shadow-[0_0_15px_rgba(59,178,255,0.15)] border-neon-blue/30',
    'neon-green': 'shadow-[0_0_15px_rgba(52,211,153,0.15)] border-neon-green/30',
    'neon-amber': 'shadow-[0_0_15px_rgba(251,191,36,0.15)] border-neon-amber/30',
    'neon-pink': 'shadow-[0_0_15px_rgba(236,72,153,0.15)] border-neon-pink/30',
  };

  return (
    <div className={`glass-card flex items-center justify-between border ${glowStyles[glowColor]}`}>
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-orbitron font-bold text-white">
          {value}
        </h3>
      </div>
      <div className={`p-4 rounded-full bg-white/5 border border-white/10`}>
        <Icon className={`text-${glowColor}`} size={24} />
      </div>
    </div>
  );
};

export default StatCard;
