import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      setTitle("");
      setDescription("");
      setCompleted(false);
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title.",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      completed,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <i className="fas fa-plus-circle text-blue-600 text-xl mr-3"></i>
        <h2 className="text-lg font-semibold text-slate-800">Add New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
            <Input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <Select value={completed.toString()} onValueChange={(value) => setCompleted(value === "true")}>
              <SelectTrigger className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Pending</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <Textarea
            rows={3}
            placeholder="Add task description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-plus mr-2"></i>
            {createMutation.isPending ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
}
