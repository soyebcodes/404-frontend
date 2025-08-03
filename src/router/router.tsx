import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TaskPage";
import DashboardPage from "../pages/DashboardPage";
import AnnotatePage from "../pages/AnnotatePage";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "tasks",
        Component: TasksPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "annotate",
        Component: AnnotatePage,
      },
    ],
  },
]);
