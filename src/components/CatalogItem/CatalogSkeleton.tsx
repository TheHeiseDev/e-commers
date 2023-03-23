import ContentLoader from "react-content-loader";

const CatalogSkeleton = () => (
  <ContentLoader
    speed={2}
    width={1041}
    height={281}
    viewBox="0 0 1041 281"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="296" y="0" rx="2" ry="2" width="330" height="19" />
    <rect x="10" y="0" rx="10" ry="10" width="276" height="236" />
    <rect x="296" y="38" rx="2" ry="2" width="249" height="19" />
    <rect x="296" y="71" rx="2" ry="2" width="180" height="19" />
    <rect x="296" y="101" rx="2" ry="2" width="100" height="19" />
    <rect x="296" y="131" rx="2" ry="2" width="249" height="19" />
    <rect x="296" y="164" rx="2" ry="2" width="50" height="19" />
    <rect x="859" y="0" rx="6" ry="2" width="85" height="26" />
    <rect x="859" y="187" rx="10" ry="10" width="120" height="49" />
    <rect x="992" y="186" rx="49" ry="49" width="49" height="49" />
  </ContentLoader>
);

export default CatalogSkeleton;
