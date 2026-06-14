import React from 'react';

const GlassInput = ({ label, type = 'text', options = [], value, onChange, placeholder, required = false, name }) => {
  const commonClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all placeholder-white/30";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-gray-300 font-inter">{label}{required && <span className="text-neon-pink">*</span>}</label>}
      
      {type === 'select' ? (
        <select 
          value={value} 
          onChange={onChange} 
          className={`${commonClasses} appearance-none`}
          required={required}
          name={name}
        >
          <option value="" disabled className="bg-navy-purple text-gray-400">Select an option</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt} className="bg-navy-purple text-white">
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default GlassInput;
