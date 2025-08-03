import { useTaskStore } from "../../store/useTaskStore";

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useTaskStore();

  return (
    <div className="mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded px-3 py-1"
      />
    </div>
  );
}
