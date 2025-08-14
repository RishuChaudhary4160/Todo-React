import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import type { Todo } from "@shared/schema";
import Header from "@/components/Header";
import AddTaskForm from "@/components/AddTaskForm";
import FilterButtons from "@/components/FilterButtons";
import TaskList from "@/components/TaskList";
import EditTaskModal from "@/components/EditTaskModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

type FilterType = "all" | "pending" | "completed";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const [deletingTask, setDeletingTask] = useState<{ id: string; title: string } | null>(null);

  const { data: todos = [], isLoading, error, refetch } = useQuery({
    queryKey: ["/api/todos"],
    queryFn: todoApi.getTodos,
  });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter = 
        activeFilter === "all" ||
        (activeFilter === "completed" && todo.completed) ||
        (activeFilter === "pending" && !todo.completed);
      
      const matchesSearch = 
        !searchQuery ||
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [todos, activeFilter, searchQuery]);

  const taskStats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  const handleEditTask = (task: Todo) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string, title: string) => {
    setDeletingTask({ id, title });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-4">
          <div className="flex items-center mb-4">
            <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3"></i>
            <h3 className="font-semibold text-red-800">Something went wrong</h3>
          </div>
          <p className="text-red-600 mb-4">Failed to load tasks. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header taskStats={taskStats} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddTaskForm />
        
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Loading tasks...</span>
          </div>
        ) : (
          <TaskList
            todos={filteredTodos}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </main>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <DeleteConfirmModal
          isOpen={!!deletingTask}
          taskId={deletingTask.id}
          taskTitle={deletingTask.title}
          onClose={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}
