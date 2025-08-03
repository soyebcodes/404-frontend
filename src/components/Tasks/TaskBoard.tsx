import Column from "./Column";
import type { TaskStatus } from "../../types/task";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "../../store/useTaskStore";

const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

export default function TaskBoard() {
  const updateTask = useTaskStore((s) => s.updateTask);
  const tasks = useTaskStore((s) => s.tasks);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      updateTask({ ...task, status: newStatus });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <Column key={status} status={status} />
        ))}
      </div>
    </DndContext>
  );
}
