import type { Task } from "../../types/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-white p-3 rounded shadow text-left">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.dueDate}</p>
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
        {task.priority}
      </span>
      {task.tags.map((tag, i) => (
        <span
          key={i}
          className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded mr-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
