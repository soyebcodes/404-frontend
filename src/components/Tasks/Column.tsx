import { useMemo } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import type { TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

type Props = { status: TaskStatus };

export default function Column({ status }: Props) {
  const allTasks = useTaskStore((s) => s.tasks);

  const tasks = useMemo(
    () => allTasks.filter((t) => t.status === status),
    [allTasks, status]
  );

  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "rounded p-3 min-h-[200px] transition-colors",
        isOver ? "bg-blue-100 border-2 border-blue-400" : "bg-gray-100 shadow"
      )}
    >
      <h2 className="font-semibold mb-2">{status}</h2>
      {tasks.length === 0 && <p className="text-gray-500 text-sm">No tasks</p>}
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
