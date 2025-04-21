import React from "react";

type IconProps = {
  stroke_color: string; // Prop for stroke color
};

const MarketIcon: React.FC<IconProps> = ({ stroke_color }) => (
  <svg
    width="11"
    height="18"
    viewBox="0 0 11 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.808 18V16.875H4.616V11.7866C3.18267 11.5391 2.055 10.836 1.233 9.67725C0.411 8.5185 0 7.16775 0 5.625V0H10.232V5.625C10.232 7.1685 9.821 8.51925 8.999 9.67725C8.177 10.8352 7.04933 11.5384 5.616 11.7866V16.875H8.424V18H1.808ZM5.116 10.6875C6.16467 10.6875 7.07767 10.2533 7.855 9.38475C8.63233 8.51625 9.07933 7.4505 9.196 6.1875H1.035C1.153 7.45125 1.60067 8.517 2.378 9.38475C3.15533 10.2525 4.068 10.6868 5.116 10.6875ZM1.001 5.0625H9.231V1.125H1.001V5.0625Z"
      fill={stroke_color}
    />
  </svg>
);

export default MarketIcon;
