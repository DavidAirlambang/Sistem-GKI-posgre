// import React from "react";
import { FaWpforms } from "react-icons/fa";

const links = [
  {
    text: "Ruangan",
    path: "ruangs",
    icon: <FaWpforms />,
  },
  {
    text: "Aset",
    path: "aset",
    icon: <FaWpforms />,
    subcategories: [
      {
        text: "Gudang",
        path: "gudang",
        icon: <FaWpforms />,
      },
      {
        text: "Multimedia & Kesenian",
        path: "multimedia",
        icon: <FaWpforms />,
      },
      {
        text: "Aset Lain",
        path: "asetLain",
        icon: <FaWpforms />,
      },
    ],
  },
  {
    text: "Surat",
    path: "surat",
    icon: <FaWpforms />,
    subcategories: [
      {
        text: "Surat Masuk",
        path: "suratMasuk",
        icon: <FaWpforms />,
      },
      {
        text: "Surat Keluar",
        path: "suratKeluar",
        icon: <FaWpforms />,
      },
    ],
  },
  {
    text: "Administrasi Keuangan",
    path: "administrasi",
    icon: <FaWpforms />,
  },
  {
    text: "Program Kerja",
    path: "programKerja",
    icon: <FaWpforms />,
  },
  {
    text: "Viatikum",
    path: "viatikum",
    icon: <FaWpforms />,
  },
  {
    text: "User",
    path: "user",
    icon: <FaWpforms />,
    subcategories: [
      {
        text: "User Management",
        path: "userManagement",
        icon: <FaWpforms />,
      },
      {
        text: "Profile",
        path: "profile",
        icon: <FaWpforms />,
      },
    ],
  },
  {
    text: "Admin Setting",
    path: "limiter",
    icon: <FaWpforms />,
  },
];

export default links;
