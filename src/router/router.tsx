import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TaskPage";
import DashboardPage from "../pages/DashboardPage";
import AnnotatePage from "../pages/AnnotatePage";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
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
