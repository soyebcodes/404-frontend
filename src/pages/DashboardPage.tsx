import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../components/Dashboard/ChartCard";
import type { Task } from "../types/task";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function loadAllTasksByDate(): Record<string, Task[]> {
  const tasksByDate: Record<string, Task[]> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("tasks-")) {
      const date = key.replace("tasks-", "");
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const tasks = JSON.parse(raw) as Task[];
          tasksByDate[date] = tasks;
        } catch {
          // ignore malformed data
        }
      }
    }
  }
  return tasksByDate;
}

export default function DashboardPage() {
  const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    setTasksByDate(loadAllTasksByDate());
  }, []);

  const chartData = useMemo(() => {
    const statusCount: Record<string, number> = {};
    const dailyCompleted: Record<string, number> = {};
    const tagCount: Record<string, number> = {};

    Object.entries(tasksByDate).forEach(([date, tasks]) => {
      tasks.forEach((task) => {
        // Count by status
        statusCount[task.status] = (statusCount[task.status] || 0) + 1;

        // Line chart: count only if status is "Done"
        if (task.status === "Done") {
          dailyCompleted[date] = (dailyCompleted[date] || 0) + 1;
        }

        // Count by tag
        task.tags?.forEach((tag) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      });
    });

    return {
      statusData: Object.entries(statusCount).map(([status, count]) => ({
        status,
        count,
      })),
      doneByDate: Object.entries(dailyCompleted).map(([date, count]) => ({
        date,
        count,
      })),
      tagsData: Object.entries(tagCount).map(([name, value]) => ({
        name,
        value,
      })),
    };
  }, [tasksByDate]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <ChartCard title="Tasks by Status">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData.statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Completed Tasks by Date">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData.doneByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Tasks by Tag">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData.tagsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartData.tagsData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
