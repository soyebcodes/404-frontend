import type { TaskStatus } from "../../types/task";

type Props = {
  status: TaskStatus;
};

export default function Column({ status }: Props) {
  return (
    <div className="bg-gray-100 rounded p-3 shadow min-h-[200px]">
      <h2 className="font-semibold mb-2">{status}</h2>
      {/* Tasks will go here */}
    </div>
  );
}
