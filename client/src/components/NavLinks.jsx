import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
// ... (previous imports)

// eslint-disable-next-line react/prop-types
const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCategoryClick = (event, index) => {
    if (links[index].subcategories && links[index].subcategories.length > 0) {
      event.preventDefault(); // Prevent navigation for categories with subcategories
      handleDropdownToggle(index);
    }
  };

  const renderSubcategories = (subcategories) => {
    const allowedSubcategories = subcategories.filter((subcategory) => {
      return userHasAccess(user.role, subcategory.path);
    });

    if (allowedSubcategories.length === 0) {
      return null; // No allowed subcategories, do not render the dropdown
    }

    return (
      <ul className="subcategories ml-6 border-l border-gray-300 pl-4 py-2">
        {allowedSubcategories.map((subcategory) => (
          <li key={subcategory.text}>
            <NavLink
              to={subcategory.path}
              className="nav-link text-gray-600 hover:text-blue-500"
              onClick={isBigSidebar ? null : toggleSidebar}
              end
            >
              {subcategory.text}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  const userHasAccess = (role, path) => {
    switch (role) {
      case "admin":
        return adminAccess.includes(path);
      case "staff kantor":
        return kantorAccess.includes(path);
      case "majelis":
        return majelisAccess.includes(path);
      case "komisi anak":
      case "komisi remaja":
      case "komisi pemuda":
      case "komisi dewasa":
      case "komisi usia lanjut":
      case "komisi kesenian":
      case "komisi multimedia":
      case "urusan 1":
      case "urusan 2":
      case "urusan 3":
      case "urusan 4":
      case "urusan 5":
      case "urusan 6":
      case "urusan 8":
        return komisiAccess.includes(path);
      case "urusan 7":
        return u7.includes(path);
      case "staff keuangan":
        return keuanganAccess.includes(path);
      default:
        return true; // Default to true for roles not explicitly handled
    }
  };

  const adminAccess = [
    "ruangs",
    "gudang",
    "aset",
    "surat",
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
    "aset",
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
    "aset",
    "multimedia",
    "administrasi",
    "programKerja",
  ];

  const u7 = [
    "ruangs",
    "aset",
    "multimedia",
    "gudang",
    "asetLain",
    "administrasi",
    "programKerja",
  ];

  const keuanganAccess = ["administrasi", "programKerja", "viatikum"];

  return (
    <div className="nav-links">
      {links.map((link, index) => {
        const { text, path, icon, subcategories } = link;

        const hasSubcategories = subcategories && subcategories.length > 0;
        const allowedPath = userHasAccess(user.role, path);
        const allowedSubcategories = hasSubcategories
          ? subcategories.filter((subcategory) =>
              userHasAccess(user.role, subcategory.path)
            )
          : [];

        if (!allowedPath && allowedSubcategories.length === 0) {
          return null; // Do not render if no access and no allowed subcategories
        }

        return (
          <div key={text} className="nav-link-container">
            <NavLink
              to={path}
              className={`nav-link flex items-center ${
                hasSubcategories ? "with-dropdown" : ""
              }`}
              onClick={(event) => handleCategoryClick(event, index)}
            >
              <span className="icon mr-2">{icon}</span>
              <span className="flex-1">{text}</span>
              {hasSubcategories && (
                <span
                  className={`ml-auto transform ${
                    index === openDropdown ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <span className="dropdown-arrow">&#9660;</span>
                </span>
              )}
            </NavLink>
            {hasSubcategories &&
              index === openDropdown &&
              renderSubcategories(allowedSubcategories)}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
