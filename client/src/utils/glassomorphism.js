// Glassomorphism utility classes for consistent styling throughout the app
// Using preferred style: bg-black/30 backdrop-blur-xl border-white/30 for consistent glass effects

export const GLASS_STYLES = {
  // Primary glass containers (main content areas) - using preferred style
  PRIMARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl",

  // Secondary glass containers (cards, sections) - using preferred style
  SECONDARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-xl",

  // Tertiary glass containers (small elements, buttons) - using preferred style
  TERTIARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-lg",

  // Header glass - using preferred style
  HEADER: "bg-black/30 backdrop-blur-xl border-b border-white/30 shadow-xl",

  // Input fields - using preferred style
  INPUT:
    "bg-black/30 backdrop-blur-xl border border-white/30 focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30",

  // Buttons - Primary - using preferred white style
  BUTTON_PRIMARY:
    "bg-blue-500/20 backdrop-blur-md border border-blue-400/40 hover:bg-blue-500/35 shadow-xl",

  // Buttons - Secondary - using preferred white style
  BUTTON_SECONDARY:
    "bg-white/25 backdrop-blur-md border border-white/40 hover:bg-white/35 shadow-xl",

  // Header action buttons - whiter glassomorphism
  HEADER_BUTTON:
    "bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 shadow-xl",

  // Header action buttons - active state
  HEADER_BUTTON_ACTIVE:
    "bg-black/10 backdrop-blur-md border border-white/60 shadow-xl",

  // Dropdown/Modal - using preferred style
  DROPDOWN: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl",

  // Dropdown menu items - using preferred style
  DROPDOWN_ITEM:
    "bg-black/20 backdrop-blur-lg border border-white/20 hover:bg-black/40 hover:border-white/40",

  // Notification/Alert - using preferred style
  NOTIFICATION: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-xl",

  // Dark glass for overlays - using preferred style
  OVERLAY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-lg",
};

// Hover effects for interactive elements - using preferred style
export const GLASS_HOVER = {
  PRIMARY: "hover:bg-black/40 hover:shadow-3xl",
  SECONDARY: "hover:bg-black/40 hover:shadow-2xl",
  TERTIARY: "hover:bg-black/40 hover:shadow-xl",
  BUTTON: "hover:scale-105 hover:bg-white/35 hover:shadow-2xl",
  NOTIFICATION: "hover:bg-black/40 hover:shadow-2xl",
};

// Focus effects for form elements - using preferred style
export const GLASS_FOCUS = {
INPUT: "focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30 focus:outline-none",
SELECT: "focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30 focus:outline-none",
  BUTTON: "focus:ring-2 focus:ring-white/30 focus:outline-none",
};

// Transition classes for smooth animations
export const GLASS_TRANSITIONS = {
  DEFAULT: "transition-all duration-200",
  SLOW: "transition-all duration-300",
  FAST: "transition-all duration-150",
};

// Combined utility functions for common patterns
export const getGlassStyles = (type = 'PRIMARY', includeHover = false, includeTransition = true) => {
  let styles = GLASS_STYLES[type] || GLASS_STYLES.PRIMARY;
  
  if (includeHover) {
    styles += ` ${GLASS_HOVER[type] || GLASS_HOVER.PRIMARY}`;
  }
  
  if (includeTransition) {
    styles += ` ${GLASS_TRANSITIONS.DEFAULT}`;
  }
  
  return styles;
};

// Preset combinations for common use cases
export const GLASS_PRESETS = {
  // Auth page main container
  AUTH_MAIN: `${GLASS_STYLES.PRIMARY} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Dashboard card
  DASHBOARD_CARD: `${GLASS_STYLES.SECONDARY} ${GLASS_HOVER.SECONDARY} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Header
  HEADER_CONTAINER: `${GLASS_STYLES.HEADER} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Interactive button
  INTERACTIVE_BUTTON: `${GLASS_STYLES.BUTTON_SECONDARY} ${GLASS_HOVER.BUTTON} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Header action button - whiter glassomorphism
  HEADER_ACTION_BUTTON: `${GLASS_STYLES.HEADER_BUTTON} ${GLASS_HOVER.BUTTON} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Active action button - darker glassomorphism
  ACTIVE_ACTION_BUTTON: `${GLASS_STYLES.HEADER_BUTTON_ACTIVE}`,

  // Form input
  FORM_INPUT: `${GLASS_STYLES.INPUT} ${GLASS_FOCUS.INPUT} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Notification badge
  NOTIFICATION_BADGE: `${GLASS_STYLES.NOTIFICATION} ${GLASS_HOVER.NOTIFICATION} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Modal/Dropdown
  MODAL_CONTAINER: `${GLASS_STYLES.DROPDOWN} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Form select/dropdown
  FORM_SELECT: `${GLASS_STYLES.INPUT} ${GLASS_FOCUS.SELECT} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Dropdown menu container
  DROPDOWN_MENU: `${GLASS_STYLES.DROPDOWN} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Dropdown menu item
  DROPDOWN_MENU_ITEM: `${GLASS_STYLES.DROPDOWN_ITEM} ${GLASS_TRANSITIONS.DEFAULT}`,

  // Back button (from auth pages)
  BACK_BUTTON: `${GLASS_STYLES.OVERLAY} ${GLASS_HOVER.TERTIARY} ${GLASS_TRANSITIONS.DEFAULT}`,
};
