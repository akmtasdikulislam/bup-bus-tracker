import React, { useEffect } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Z_CLASSES } from '../../utils/zIndexLayers';
import { GLASS_PRESETS } from '../../utils/glassomorphism';

const GlassModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',  
  showCloseButton = true,
  className = "",
  headerClassName = "",
  contentClassName = "",
  footerActions = null,
  ...props 
}) => {
   
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
       
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-full mx-4';
      default:
        return 'max-w-lg';
    }
  };

  return (
    <div
      className={`fixed inset-0 ${Z_CLASSES.MODAL} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
      onClick={handleBackdropClick}
      {...props}
    >
      <div 
        className={`relative max-h-[90vh] w-full ${getSizeClasses()} overflow-y-auto rounded-xl ${GLASS_PRESETS.MODAL_CONTAINER} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        { }
        <div className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 bg-black/90 p-6 ${headerClassName}`}>
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className={`p-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
              aria-label="Close modal"
            >
              <PiXBold className="h-5 w-5" />
            </button>
          )}
        </div>

        { }
        <div className={`relative ${Z_CLASSES.MODAL_CONTENT} p-6 ${contentClassName}`}>
          {children}
        </div>

        { }
        {footerActions && (
          <div className="sticky bottom-0 border-t border-white/20 bg-black/90 p-6">
            <div className="flex justify-end gap-3">
              {footerActions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassModal;
