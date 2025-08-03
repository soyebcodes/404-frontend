import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TaskPage";
import DashboardPage from "../pages/DashboardPage";
import AnnotatePage from "../pages/AnnotatePage";

export const router = createBrowserRouter([
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
]);
