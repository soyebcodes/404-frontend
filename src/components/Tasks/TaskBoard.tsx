import Column from "./Column";
import type { TaskStatus } from "../../types/task";

const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

export default function TaskBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map((status) => (
        <Column key={status} status={status} />
      ))}
    </div>
  );
}
