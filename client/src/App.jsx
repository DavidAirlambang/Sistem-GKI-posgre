import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  EditGudang,
  Multimedia,
  EditSuratMasuk,
  SuratKeluar,
  EditSuratKeluar,
  EditAdministrasi,
  ProgramKerja,
  EditProgramKerja,
  CreateProgramKerja,
  DetailLaporanProker,
  AllAdministrasi,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
// import ErrorElement from "./components/ErrorElement";

// new action
import { loader as ruanganLoader } from "./pages/Ruang";
import { action as ruanganAction } from "./pages/BookingRuangan";
import { action as approveAction } from "./pages/ApproveRuangan";
import { action as resetRuanganAction } from "./pages/ResetRuangan";
import { action as gudangAction } from "./pages/Gudang";
import { loader as gudangLoader } from "./pages/Gudang";
import { loader as gudangEditLoader } from "./pages/EditGudang";
import { action as gudangEditAction } from "./pages/EditGudang";
import { action as gudangDelete } from "./pages/DeleteGudang";
import { action as multimediaAction } from "./pages/Multimedia";
import { loader as multimediaLoader } from "./pages/Multimedia";
import EditMultimedia, {
  loader as multimediaEditLoader,
} from "./pages/EditMultimedia";
import { action as multimediaEditAction } from "./pages/EditMultimedia";
import AsetLain, { action as asetLainAction } from "./pages/AsetLain";
import { loader as asetLainLoader } from "./pages/AsetLain";
import EditAsetLain, {
  loader as asetLainEditLoader,
} from "./pages/EditAsetLain";
import { action as asetLainEditAction } from "./pages/EditAsetLain";
import SuratMasuk, { action as suratMasukAction } from "./pages/SuratMasuk";
import { loader as suratMasukLoader } from "./pages/SuratMasuk";
import { loader as suratMasukEditLoader } from "./pages/EditSuratMasuk";
import { action as suratMasukEditAction } from "./pages/EditSuratMasuk";
import { action as suratKeluarAction } from "./pages/SuratKeluar";
import { loader as suratKeluarLoader } from "./pages/SuratKeluar";
import { loader as suratKeluarEditLoader } from "./pages/EditSuratKeluar";
import { action as suratKeluarEditAction } from "./pages/EditSuratKeluar";
import { action as administrasiAction } from "./pages/Administrasi";
import { loader as administrasiLoader } from "./pages/Administrasi";
import { loader as administrasiEditLoader } from "./pages/EditAdministrasi";
import { action as administrasiEditAction } from "./pages/EditAdministrasi";
import { action as createProgramKerjaAction } from "./pages/CreateProgramKerja";
import { loader as programKerjaEditLoader } from "./pages/EditProgramKerja";
import { action as programKerjaEditAction } from "./pages/EditProgramKerja";

import Ruang from "./pages/Ruang";
import BookingRuangan from "./pages/BookingRuangan";
import Gudang from "./pages/Gudang";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        // element: <Landing />,
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      // {
      //   path: "login",
      //   element: <Login />,
      //   action: loginAction(queryClient),
      // },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            path: "ruangs",
            element: <Ruang />,
            loader: ruanganLoader,
          },
          // {
          //   element: <AddJob />,
          //   action: addJobAction(queryClient),
          // },
          {
            path: "booking/:noRuangan",
            element: <BookingRuangan />,
            action: ruanganAction(),
          },
          {
            path: "gudang",
            element: <Gudang />,
            action: gudangAction(),
            loader: gudangLoader,
          },
          {
            path: "gudang/:noBarang",
            element: <EditGudang />,
            action: gudangEditAction(),
            loader: gudangEditLoader,
          },
          {
            path: "multimedia",
            element: <Multimedia />,
            action: multimediaAction(),
            loader: multimediaLoader,
          },
          {
            path: "multimedia/:noMultimedia",
            element: <EditMultimedia />,
            action: multimediaEditAction(),
            loader: multimediaEditLoader,
          },
          {
            path: "asetLain",
            element: <AsetLain />,
            action: asetLainAction(),
            loader: asetLainLoader,
          },
          {
            path: "asetLain/:noAsetLain",
            element: <EditAsetLain />,
            action: asetLainEditAction(),
            loader: asetLainEditLoader,
          },
          {
            path: "suratMasuk",
            element: <SuratMasuk />,
            action: suratMasukAction(),
            loader: suratMasukLoader,
          },
          {
            path: "suratMasuk/:noSuratMasuk",
            element: <EditSuratMasuk />,
            action: suratMasukEditAction(),
            loader: suratMasukEditLoader,
          },
          {
            path: "suratKeluar",
            element: <SuratKeluar />,
            action: suratKeluarAction(),
            loader: suratKeluarLoader,
          },
          {
            path: "suratKeluar/:noSuratKeluar",
            element: <EditSuratKeluar />,
            action: suratKeluarEditAction(),
            loader: suratKeluarEditLoader,
          },
          {
            path: "administrasi",
            element: <AllAdministrasi />,
            action: administrasiAction(),
            loader: administrasiLoader,
          },
          {
            path: "administrasi/pendapatan/:noAdministrasi",
            element: <EditAdministrasi />,
            action: administrasiEditAction(),
            loader: administrasiEditLoader,
          },

          // program kerja
          {
            path: "programKerja",
            element: <ProgramKerja />,
            // loader: programKerjaLoader,
          },
          {
            path: "createProgramKerja",
            element: <CreateProgramKerja />,
            action: createProgramKerjaAction(),
          },
          {
            path: "editProgramKerja/:noProker",
            element: <EditProgramKerja />,
            action: programKerjaEditAction(),
            loader: programKerjaEditLoader,
          },
          {
            path: "detailProgramKerja/:noProker",
            element: <DetailLaporanProker />,
            // action: programKerjaEditAction(),
            loader: programKerjaEditLoader,
          },

          { path: "approve/:noRuangan", action: approveAction },
          { path: "reset/:noRuangan", action: resetRuanganAction },
          { path: "delete-gudang/:noBarang", action: gudangDelete },
          // {
          //   path: "all-jobs",
          //   element: <AllJobs />,
          //   loader: allJobsLoader(queryClient),
          //   errorElement: <ErrorElement />,
          // },
          // {
          //   path: 'profile',
          //   element: <Profile />,
          //   action: profileAction(queryClient),
          // },
          // {
          //   path: 'admin',
          //   element: <Admin />,
          //   loader: adminLoader,
          // },
          // {
          //   path: 'edit-job/:id',
          //   element: <EditJob />,
          //   loader: editJobLoader(queryClient),
          //   action: editJobAction(queryClient),
          // },
          // { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
