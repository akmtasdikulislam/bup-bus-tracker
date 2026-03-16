/**
 * Z-Index Layer System for BUP Bus Tracker
 * 
 * This file defines a consistent z-index system to prevent layering conflicts
 * throughout the application. All z-index values should follow this hierarchy.
 */

export const Z_INDEX_LAYERS = {
  // Background layers (negative or 0)
  BACKGROUND: 0,
  BACKGROUND_OVERLAY: 1,
  
  // Main content layers (1-9)
  CONTENT: 10,
  CONTENT_OVERLAY: 20,
  
  // UI elements (10-49)
  HEADER: 30,
  SIDEBAR: 35,
  FLOATING_ELEMENTS: 40,
  
  // Interactive elements (50-99)
  DROPDOWN: 50,
  TOOLTIP: 60,
  POPOVER: 70,
  
  // Overlay elements (100-999)
  NOTIFICATION: 100,
  MODAL_BACKDROP: 900,
  MODAL: 1000,
  MODAL_HEADER: 1010,
  MODAL_CONTENT: 1005,
  
  // Critical overlays (1000+)
  LOADING_OVERLAY: 1100,
  TOAST: 1200,
  DEBUG_PANEL: 9999,
};

// Helper functions for Tailwind CSS classes
export const getZIndexClass = (layer) => {
  const zIndexMap = {
    [Z_INDEX_LAYERS.BACKGROUND]: 'z-0',
    [Z_INDEX_LAYERS.BACKGROUND_OVERLAY]: 'z-[1]',
    [Z_INDEX_LAYERS.CONTENT]: 'z-10',
    [Z_INDEX_LAYERS.CONTENT_OVERLAY]: 'z-20',
    [Z_INDEX_LAYERS.HEADER]: 'z-30',
    [Z_INDEX_LAYERS.SIDEBAR]: 'z-[35]',
    [Z_INDEX_LAYERS.FLOATING_ELEMENTS]: 'z-40',
    [Z_INDEX_LAYERS.DROPDOWN]: 'z-50',
    [Z_INDEX_LAYERS.TOOLTIP]: 'z-[60]',
    [Z_INDEX_LAYERS.POPOVER]: 'z-[70]',
    [Z_INDEX_LAYERS.NOTIFICATION]: 'z-[100]',
    [Z_INDEX_LAYERS.MODAL_BACKDROP]: 'z-[900]',
    [Z_INDEX_LAYERS.MODAL]: 'z-[1000]',
    [Z_INDEX_LAYERS.MODAL_HEADER]: 'z-[1010]',
    [Z_INDEX_LAYERS.MODAL_CONTENT]: 'z-[1005]',
    [Z_INDEX_LAYERS.LOADING_OVERLAY]: 'z-[1100]',
    [Z_INDEX_LAYERS.TOAST]: 'z-[1200]',
    [Z_INDEX_LAYERS.DEBUG_PANEL]: 'z-[9999]',
  };
  
  return zIndexMap[layer] || 'z-0';
};

// Export commonly used z-index classes
export const Z_CLASSES = {
  BACKGROUND: getZIndexClass(Z_INDEX_LAYERS.BACKGROUND),
  BACKGROUND_OVERLAY: getZIndexClass(Z_INDEX_LAYERS.BACKGROUND_OVERLAY),
  CONTENT: getZIndexClass(Z_INDEX_LAYERS.CONTENT),
  CONTENT_OVERLAY: getZIndexClass(Z_INDEX_LAYERS.CONTENT_OVERLAY),
  HEADER: getZIndexClass(Z_INDEX_LAYERS.HEADER),
  SIDEBAR: getZIndexClass(Z_INDEX_LAYERS.SIDEBAR),
  FLOATING_ELEMENTS: getZIndexClass(Z_INDEX_LAYERS.FLOATING_ELEMENTS),
  DROPDOWN: getZIndexClass(Z_INDEX_LAYERS.DROPDOWN),
  TOOLTIP: getZIndexClass(Z_INDEX_LAYERS.TOOLTIP),
  POPOVER: getZIndexClass(Z_INDEX_LAYERS.POPOVER),
  NOTIFICATION: getZIndexClass(Z_INDEX_LAYERS.NOTIFICATION),
  MODAL_BACKDROP: getZIndexClass(Z_INDEX_LAYERS.MODAL_BACKDROP),
  MODAL: getZIndexClass(Z_INDEX_LAYERS.MODAL),
  MODAL_HEADER: getZIndexClass(Z_INDEX_LAYERS.MODAL_HEADER),
  MODAL_CONTENT: getZIndexClass(Z_INDEX_LAYERS.MODAL_CONTENT),
  LOADING_OVERLAY: getZIndexClass(Z_INDEX_LAYERS.LOADING_OVERLAY),
  TOAST: getZIndexClass(Z_INDEX_LAYERS.TOAST),
  DEBUG_PANEL: getZIndexClass(Z_INDEX_LAYERS.DEBUG_PANEL),
};

export default Z_INDEX_LAYERS;
