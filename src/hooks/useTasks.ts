import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { useDateStore } from "../store/usedateStore";
import { nanoid } from "nanoid";

export function useTasks() {
  const { selectedDate } = useDateStore();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`tasks-${selectedDate}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTasks(parsed);
      } catch (e) {
        console.error("Error parsing tasks from localStorage", e);
      }
    } else {
      setTasks([]);
    }
  }, [selectedDate]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(`tasks-${selectedDate}`, JSON.stringify(tasks));
  }, [tasks, selectedDate]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: nanoid(),
    };
    setTasks((prev) => [...prev, newTask]);
    console.log("Task added:", newTask);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return { tasks, addTask, deleteTask, updateTask, getTasksByStatus };
}
