import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import ErrorElement from "./components/ErrorElement";

// new action
import { loader as ruanganLoader } from "./pages/Ruang";
import { action as ruanganAction } from "./pages/BookingRuangan";
import { action as approveAction } from "./pages/ApproveRuangan";
import { action as resetRuanganAction } from "./pages/ResetRuangan";
// import { loader as bookingLoader } from "./pages/BookingRuangan";

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
            // loader: bookingLoader(),
          },
          {
            path: "gudang",
            element: <Gudang />,
            // action: gudangAction(),
            // loader: gudangLoader(),
          },

          { path: "approve/:noRuangan", action: approveAction },
          { path: "reset/:noRuangan", action: resetRuanganAction },
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
