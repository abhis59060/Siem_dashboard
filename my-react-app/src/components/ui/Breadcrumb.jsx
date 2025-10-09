import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Define route names for breadcrumbs
  const routeNames = {
    "": "SIEM Dashboard Overview",
    alerts: "Alerts",
    reports: "Reports",
    settings: "Settings",
    profile: "Profile",
    notifications: "Notifications",
    security: "Security",
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      <Link to="/" className="hover:text-white">
        {routeNames[""]}
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={to} className="flex items-center space-x-2">
            <span>/</span>
            {isLast ? (
              <span className="text-white">{routeNames[value] || value}</span>
            ) : (
              <Link to={to} className="hover:text-white">
                {routeNames[value] || value}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}