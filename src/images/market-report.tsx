import React from "react";

type IconProps = {
  stroke_color: string; // Prop for stroke color
};

const MarketReportIcon: React.FC<IconProps> = ({ stroke_color }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.47241 15.5219L8.65579 10.4703V15.5219L11.8386 10.4703V15.5219M20.723 9.12158L16.6898 15.5219V10.4703L13.507 15.5219V10.4703"
      stroke={stroke_color}
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.298 9.83008L20.7231 9.12158L21.1808 10.0495"
      stroke={stroke_color}
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.8541 2.979H5.14579C3.94918 2.979 2.97913 3.94905 2.97913 5.14567V20.854C2.97913 22.0506 3.94918 23.0207 5.14579 23.0207H20.8541C22.0507 23.0207 23.0208 22.0506 23.0208 20.854V5.14567C23.0208 3.94905 22.0507 2.979 20.8541 2.979Z"
      stroke={stroke_color}
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default MarketReportIcon;
