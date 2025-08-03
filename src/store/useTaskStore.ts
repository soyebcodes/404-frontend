import { create } from "zustand";
import type { Task } from "../types/task";

type TaskStore = {
  tasks: Task[];
  selectedDate: string;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setSelectedDate: (date: string) => void;
  loadTasks: (date: string) => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedDate: new Date().toISOString().split("T")[0],

  setSelectedDate: (date) => {
    set({ selectedDate: date });
    get().loadTasks(date);
  },

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) => {
    const updated = [...get().tasks, task];
    set({ tasks: updated });
    localStorage.setItem(
      `tasks-${get().selectedDate}`,
      JSON.stringify(updated)
    );
  },

  updateTask: (updatedTask) => {
    const updated = get().tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    set({ tasks: updated });
    localStorage.setItem(
      `tasks-${get().selectedDate}`,
      JSON.stringify(updated)
    );
  },

  deleteTask: (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updated });
    localStorage.setItem(
      `tasks-${get().selectedDate}`,
      JSON.stringify(updated)
    );
  },

  loadTasks: (date) => {
    const stored = localStorage.getItem(`tasks-${date}`);
    if (stored) {
      set({ tasks: JSON.parse(stored) });
    } else {
      set({ tasks: [] });
    }
  },
}));
