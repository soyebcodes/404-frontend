import { useState } from "react";
import type { TaskStatus } from "../../types/task";
import { useTaskStore } from "../../store/useTaskStore";
import { nanoid } from "nanoid";

type Props = {
  onClose: () => void;
};

export default function TaskModal({ onClose }: Props) {
  const addTask = useTaskStore((s) => s.addTask);
  const selectedDate = useTaskStore((s) => s.selectedDate);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("To Do");

  const handleSubmit = () => {
    if (!title || !dueDate) return;
    addTask({
      id: nanoid(),
      title,
      priority,
      dueDate,
      status,
      tags: tags.split(",").map((t) => t.trim()),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Due Date"
          type="date"
          className="border p-2 w-full mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          placeholder="Tags (comma separated)"
          className="border p-2 w-full mb-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
