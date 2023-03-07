import React from "react";
import ContentLoader from "react-content-loader";

const FurnitureSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={310}
    height={472}
    viewBox="0 0 310 472"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="310" height="265" />
    <rect x="0" y="284" rx="10" ry="10" width="310" height="42" />
    <rect x="0" y="427" rx="10" ry="10" width="33" height="20" />
    <rect x="270" y="415" rx="10" ry="10" width="37" height="37" />
    <rect x="-2" y="350" rx="10" ry="10" width="310" height="55" />
  </ContentLoader>
);

export default FurnitureSkeleton;
