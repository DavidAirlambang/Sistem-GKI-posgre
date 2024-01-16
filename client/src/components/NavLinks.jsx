import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        // akses yang bisa diberikan
        const adminAccess = [
          "ruangs",
          "gudang",
          "multimedia",
          "asetLain",
          "suratMasuk",
          "suratKeluar",
          "administrasi",
          "programKerja",
          "viatikum",
          "user",
          "limiter",
        ];

        const kantorAccess = [
          "ruangs",
          "gudang",
          "multimedia",
          "asetLain",
          "suratMasuk",
          "suratKeluar",
        ];

        const majelisAccess = [
          "administrasi",
          "programKerja",
          "multimedia",
          "viatikum",
        ];

        const komisiAccess = [
          "ruangs",
          "multimedia",
          "administrasi",
          "programKerja",
        ];

        const keuanganAccess = ["administrasi", "programKerja", "viatikum"];

        // kita switch
        let allowedPaths = [];

        switch (true) {
          case user.role.startsWith("komisi") || user.role.startsWith("urusan"):
            // Treat all komisi subcategories the same way
            allowedPaths = komisiAccess;
            break;
          case user.role === "admin":
            allowedPaths = adminAccess;
            break;
          case user.role === "staff kantor":
            allowedPaths = kantorAccess;
            break;
          case user.role === "majelis":
            allowedPaths = majelisAccess;
            break;
          case user.role === "staff keuangan":
            allowedPaths = keuanganAccess;
            break;
          default:
            break;
        }

        // Check if the current user has access to the requested path
        if (!allowedPaths.includes(path)) {
          return null;
        }

        // If the user has the required access, render the NavLink
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
