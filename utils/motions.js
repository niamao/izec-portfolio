export const initial = { opacity: 0 };
export const animate = { opacity: 1 };
export const exit = { opacity: 0 };
export const transition = { delay: 1 };
export const initialMobile = { y: "100%" };
export const animateMobile = { y: "0%" };
export const exitMobile = { y: "100%" };

export const getHeadingMotionProps = (theme) => {
    const commonProps = {
        opacity: 1,
      };
  
    if (theme === 'dark') {
      return {
        ...commonProps,
        color: "#fbf8f3",// Dark theme color
      };
    } else {
      return {
        ...commonProps,
        color: "#232332",  // Light theme color
        "--tw-gradient-from": '#64748b',
        "--tw-gradient-to":  '#64748b'
      };
    }
  };
