import React, { useState, useRef, useEffect } from 'react';
import { PiCaretDownDuotone, PiMagnifyingGlassDuotone } from 'react-icons/pi';
import { GLASS_PRESETS } from '../../utils/glassomorphism';

const GlassSearchDropdown = ({ 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Search and select",
  className = "",
  error = null,
  disabled = false,
  maxHeight = "200px",
  searchPlaceholder = "Search...",
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue
      }
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.value === value);

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
          <span className={selectedOption ? 'text-white' : 'text-gray-300'}>
            {selectedOption?.label || placeholder}
          </span>
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
          {/* Search input */}
          <div className="p-2 border-b border-white/20">
            <div className="relative">
              <PiMagnifyingGlassDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className={`w-full rounded-lg py-2 pr-3 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 60px)` }}>
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-300">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`px-3 py-2 cursor-pointer text-sm text-white hover:bg-black/40 transition-colors ${
                    value === option.value ? 'bg-black/30' : ''
                  }`}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default GlassSearchDropdown;
