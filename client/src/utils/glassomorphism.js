 

export const GLASS_STYLES = {
   
  PRIMARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl",

  SECONDARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-xl",

  TERTIARY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-lg",

  HEADER: "bg-black/30 backdrop-blur-xl border-b border-white/30 shadow-xl",

  INPUT:
    "bg-black/30 backdrop-blur-xl border border-white/30 focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30",

  BUTTON_PRIMARY:
    "bg-blue-500/20 backdrop-blur-md border border-blue-400/40 hover:bg-blue-500/35 shadow-xl",

  BUTTON_SECONDARY:
    "bg-white/25 backdrop-blur-md border border-white/40 hover:bg-white/35 shadow-xl",

  HEADER_BUTTON:
    "bg-white/30 backdrop-blur-md border border-white/50 hover:bg-white/40 shadow-xl",

  HEADER_BUTTON_ACTIVE:
    "bg-black/10 backdrop-blur-md border border-white/60 shadow-xl",

  DROPDOWN: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl",

  DROPDOWN_ITEM:
    "bg-black/20 backdrop-blur-lg border border-white/20 hover:bg-black/40 hover:border-white/40",

  NOTIFICATION: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-xl",

  OVERLAY: "bg-black/30 backdrop-blur-xl border border-white/30 shadow-lg",
};

export const GLASS_HOVER = {
  PRIMARY: "hover:bg-black/40 hover:shadow-3xl",
  SECONDARY: "hover:bg-black/40 hover:shadow-2xl",
  TERTIARY: "hover:bg-black/40 hover:shadow-xl",
  BUTTON: "hover:scale-105 hover:bg-white/35 hover:shadow-2xl",
  NOTIFICATION: "hover:bg-black/40 hover:shadow-2xl",
};

export const GLASS_FOCUS = {
INPUT: "focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30 focus:outline-none",
SELECT: "focus:border-green-400/50 focus:bg-black/40 focus:ring-2 focus:ring-green-400/30 focus:outline-none",
  BUTTON: "focus:ring-2 focus:ring-white/30 focus:outline-none",
};

export const GLASS_TRANSITIONS = {
  DEFAULT: "transition-all duration-200",
  SLOW: "transition-all duration-300",
  FAST: "transition-all duration-150",
};

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

export const GLASS_PRESETS = {
   
  AUTH_MAIN: `${GLASS_STYLES.PRIMARY} ${GLASS_TRANSITIONS.DEFAULT}`,

  DASHBOARD_CARD: `${GLASS_STYLES.SECONDARY} ${GLASS_HOVER.SECONDARY} ${GLASS_TRANSITIONS.DEFAULT}`,

  HEADER_CONTAINER: `${GLASS_STYLES.HEADER} ${GLASS_TRANSITIONS.DEFAULT}`,

  INTERACTIVE_BUTTON: `${GLASS_STYLES.BUTTON_SECONDARY} ${GLASS_HOVER.BUTTON} ${GLASS_TRANSITIONS.DEFAULT}`,

  HEADER_ACTION_BUTTON: `${GLASS_STYLES.HEADER_BUTTON} ${GLASS_HOVER.BUTTON} ${GLASS_TRANSITIONS.DEFAULT}`,

  ACTIVE_ACTION_BUTTON: `${GLASS_STYLES.HEADER_BUTTON_ACTIVE}`,

  FORM_INPUT: `${GLASS_STYLES.INPUT} ${GLASS_FOCUS.INPUT} ${GLASS_TRANSITIONS.DEFAULT}`,

  NOTIFICATION_BADGE: `${GLASS_STYLES.NOTIFICATION} ${GLASS_HOVER.NOTIFICATION} ${GLASS_TRANSITIONS.DEFAULT}`,

  MODAL_CONTAINER: `${GLASS_STYLES.DROPDOWN} ${GLASS_TRANSITIONS.DEFAULT}`,

  FORM_SELECT: `${GLASS_STYLES.INPUT} ${GLASS_FOCUS.SELECT} ${GLASS_TRANSITIONS.DEFAULT}`,

  DROPDOWN_MENU: `${GLASS_STYLES.DROPDOWN} ${GLASS_TRANSITIONS.DEFAULT}`,

  DROPDOWN_MENU_ITEM: `${GLASS_STYLES.DROPDOWN_ITEM} ${GLASS_TRANSITIONS.DEFAULT}`,

  BACK_BUTTON: `${GLASS_STYLES.OVERLAY} ${GLASS_HOVER.TERTIARY} ${GLASS_TRANSITIONS.DEFAULT}`,
};
