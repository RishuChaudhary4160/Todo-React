import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Todo } from "@shared/schema";

interface TaskCardProps {
  task: Todo;
  onEdit: (task: Todo) => void;
  onDelete: (id: string, title: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleMutation = useMutation({
    mutationFn: (completed: boolean) => todoApi.toggleTodo(task.id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
    },
  });

  const handleToggleComplete = () => {
    toggleMutation.mutate(!task.completed);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-200 animate-slide-up ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={handleToggleComplete}
            disabled={toggleMutation.isPending}
            className={`mt-1 w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
              task.completed
                ? 'border-emerald-500 bg-emerald-500'
                : 'border-slate-300 hover:border-blue-500'
            }`}
          >
            {task.completed && <i className="fas fa-check text-white text-xs"></i>}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className={`font-semibold truncate ${
                task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
              }`}>
                {task.title}
              </h3>
              
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                task.completed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            
            {task.description && (
              <p className={`text-sm mb-3 line-clamp-2 ${
                task.completed ? 'text-slate-500' : 'text-slate-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center text-xs text-slate-500 space-x-4">
              <span className="flex items-center">
                <i className="far fa-calendar mr-1"></i>
                <span>{formatTimeAgo(task.createdAt)}</span>
              </span>
              <span className="flex items-center">
                <i className="far fa-clock mr-1"></i>
                <span>ID: #{task.id.slice(-6)}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => onDelete(task.id, task.title)}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
