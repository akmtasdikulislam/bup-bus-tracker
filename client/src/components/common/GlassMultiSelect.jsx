import React, { useState, useRef, useEffect } from 'react';
import { PiCaretDownDuotone, PiCheckDuotone, PiXDuotone } from 'react-icons/pi';
import { GLASS_PRESETS } from '../../utils/glassomorphism';

const GlassMultiSelect = ({ 
  name, 
  value = [], 
  onChange, 
  options = [], 
  placeholder = "Select options",
  className = "",
  error = null,
  disabled = false,
  maxHeight = "200px",
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    onChange({
      target: {
        name,
        value: newValue
      }
    });
  };

  const handleRemoveTag = (optionValue, e) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== optionValue);
    onChange({
      target: {
        name,
        value: newValue
      }
    });
  };

  const getSelectedLabels = () => {
    return value.map(val => options.find(opt => opt.value === val)?.label).filter(Boolean);
  };

  return (
    <div className={`relative space-y-1 ${className}`} ref={dropdownRef}>
      {/* Main dropdown button */}
      <div
        onClick={handleToggle}
        className={`w-full rounded-lg py-2.5 px-3 text-sm text-white cursor-pointer ${GLASS_PRESETS.FORM_SELECT} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {value.length === 0 ? (
              <span className="text-gray-300">{placeholder}</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {getSelectedLabels().map((label, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${GLASS_PRESETS.DROPDOWN_MENU_ITEM}`}
                  >
                    {label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(value[index], e)}
                      className="hover:text-red-400"
                    >
                      <PiXDuotone className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <PiCaretDownDuotone 
            className={`h-4 w-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className={`absolute z-50 w-full mt-1 rounded-lg ${GLASS_PRESETS.DROPDOWN_MENU} overflow-hidden`}
          style={{ maxHeight }}
        >
          <div className="overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between text-sm text-white hover:bg-black/40 transition-colors ${
                  value.includes(option.value) ? 'bg-black/30' : ''
                }`}
              >
                <span>{option.label}</span>
                {value.includes(option.value) && (
                  <PiCheckDuotone className="h-4 w-4 text-green-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default GlassMultiSelect;
