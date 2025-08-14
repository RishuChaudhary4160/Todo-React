import type { Todo } from "@shared/schema";
import TaskCard from "./TaskCard";

interface TaskListProps {
  todos: Todo[];
  onEdit: (task: Todo) => void;
  onDelete: (id: string, title: string) => void;
}

export default function TaskList({ todos, onEdit, onDelete }: TaskListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-clipboard-list text-slate-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No tasks yet</h3>
        <p className="text-slate-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TaskCard
          key={todo.id}
          task={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
