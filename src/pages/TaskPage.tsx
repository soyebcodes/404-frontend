/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TaskModal from "../components/Tasks/TaskModal";
import DateSelector from "../components/Tasks/DateSelector";
import TaskBoard from "../components/Tasks/TaskBoard";
import { useTaskStore } from "../store/useTaskStore";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => {
    loadTasks(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🗂 Task Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + Add Task
        </button>
      </div>
      <DateSelector />
      <TaskBoard />
      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
