import { create } from "zustand";

type DateStore = {
  selectedDate: string;
  setDate: (date: string) => void;
};

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: new Date().toISOString().split("T")[0],
  setDate: (date) => set({ selectedDate: date }),
}));
