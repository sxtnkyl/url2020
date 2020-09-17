//icon expands into input bar with tooltip text
//non focus: big shadow, circular border, dark bg, white text, scale down
//hover/focus: small shadow, squarish-border, light bg, dark text, scale up

//component load
const slideInFromTop = {
  hidden: { scale: 0.8, y: "-100vh", opacity: 0 },
  visible: {
    scale: 1.2,
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, when: "beforeChildren", staggerChildren: 0.5 },
  },
};

const responseComponent = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      mass: 0.5,
      when: "beforeChildren",
    },
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

//scaleIn
const scaleIn = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

//scaleHoverTap
const scaleHoverTap = {
  initial: { scale: 1, boxShadow: "none" },
  hover: {
    scale: 1.1,
    boxShadow:
      "inset 0px 0px 25px 5px rgba(235,248,255, 1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.75)",
  },
  tap: { scale: 0.9 },
};

const scaleInHoverTap = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    boxShadow: "none",
  },
  hover: {
    scale: 1.1,
    boxShadow:
      "inset 0px 0px 25px 5px rgba(235,248,255, 1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.75)",
  },
  tap: { scale: 0.9 },
};

//inset shadow
const restartButton = {
  hover: {
    scale: 1.1,
    boxShadow:
      "inset 0px 0px 25px 5px rgba(235,248,255, 1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.75)",
  },
  tap: { scale: 0.9 },
};

const iconSpin = {
  hidden: { rotate: -180 },
  visible: {
    rotate: 0,
    transition: { duration: 1 },
  },
};

const loading = {
  animate: {
    scale: [1, 0.8, 0.8, 1, 1],
    rotate: [0, 0, 360, 360, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      loop: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const pathDraw = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export {
  slideInFromTop,
  responseComponent,
  scaleIn,
  scaleHoverTap,
  scaleInHoverTap,
  restartButton,
  iconSpin,
  pathDraw,
  loading,
};
