import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  taskId: string;
  taskTitle: string;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  taskId,
  taskTitle,
  onClose,
}: DeleteConfirmModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: () => todoApi.deleteTodo(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      onClose();
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full animate-bounce-in">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Delete Task</h2>
          </div>
          
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete "<span className="font-medium">{taskTitle}</span>"? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <i className="fas fa-trash mr-2"></i>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
