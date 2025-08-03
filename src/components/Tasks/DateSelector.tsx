import { useDateStore } from "../../store/usedateStore";

export default function DateSelector() {
  const { selectedDate, setDate } = useDateStore();

  return (
    <div className="mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-1"
      />
    </div>
  );
}
