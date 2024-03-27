import React from 'react';

// RandomBackgroundColor component definition
const RandomBackgroundColor = ({ children }) => {
  // Define the array of colors
  const clrarray = ["#EDD1E0", "#F0DEDE", "#F1EFF0", "#F8ECD7", "#F8D5C1", "#DDECEF", "#F8D5DB", "#EFF1D9", "#F1EB86", "#FBFAF5", "#F7F4E5", "#F8EECA", "#F6E2CA", "#E8DAD7", "#EADCED", "#FFE7CD", "#FFD2CD", "#F8D4DE", "#D2ECFB", "#FEB1B3", "#FDD9DB", "#F8F9FB", "#D9E7F4", "#C7D4D5", "#DFE8E9", "#FAFAFA", "#EAEBE6", "#E3CCA9"];
  
  // Generate a random color
  const randomColor = clrarray[Math.floor(Math.random() * clrarray.length)];

  // Define the inline style
  const style = {
    background: `linear-gradient(-45deg, ${randomColor} 50%, white 50%)`,
  };
  

  // Render the component with the random background color
  return (
    <div className="cardhome" style={style}>
      {children}
    </div>
  );
};

export default RandomBackgroundColor;
