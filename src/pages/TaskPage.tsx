import DateSelector from "../components/Tasks/DateSelector";
import TaskBoard from "../components/Tasks/TaskBoard";

export default function TasksPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">🗂 Task Manager</h1>
      <DateSelector />
      <TaskBoard />
    </div>
  );
}
