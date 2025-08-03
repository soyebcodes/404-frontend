export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  tags: string[];
  status: TaskStatus;
}
