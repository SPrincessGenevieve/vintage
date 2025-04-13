import React from 'react';

type IconProps = {
  strokeColor: string; // Prop for stroke color
};

const PortIcon: React.FC<IconProps> = ({ strokeColor }) => (
  <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.1329 6.79431L10.5664 1L1 6.79431M1 6.79431L6.38144 9.39756V14.2682L9.66981 16.0615V19.0512L10.5664 19.6154L11.4631 19.0512V16.0615L14.7514 14.2682V9.39756L20.1329 6.79488V17.2574L10.5664 22.9375L1 17.2574V6.79431Z"
      stroke={strokeColor} // Apply the dynamic stroke color
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PortIcon;
