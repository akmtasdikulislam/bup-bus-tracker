import React from 'react';
import { GLASS_PRESETS } from '../../utils/glassomorphism';

const GlassDropdown = ({ 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select an option",
  className = "",
  error = null,
  disabled = false,
  ...props 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg py-2.5 px-3 text-sm text-white ${GLASS_PRESETS.FORM_SELECT} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        {...props}
      >
        <option value="" className="bg-black/90 backdrop-blur-xl text-white">
          {placeholder}
        </option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            className="bg-black/90 backdrop-blur-xl text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default GlassDropdown;
