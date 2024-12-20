"use client";

import TaskCard from "../taskCard/taskCard";
import { Task } from "../types";

interface TaskOverviewProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskOverview({
  tasks,
  onToggle,
  onDelete,
}: TaskOverviewProps) {
  const todayTasks = tasks.filter((task) => !task.isUpcoming);
  const upcomingTasks = tasks.filter((task) => task.isUpcoming);

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold text-[#006EFF] mb-6">Task Board</h3>

      {/* Today's Tasks */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-[#000000] mb-4">Today</h4>
        <ul className="space-y-4">
          {todayTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>

      {/* Upcoming Tasks */}
      <div>
        <h4 className="text-md font-medium text-[#000000] mb-4">Upcoming</h4>
        <ul className="space-y-4">
          {upcomingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
