import { apiRequest } from "./queryClient";
import type { Todo, InsertTodo } from "@shared/schema";

export const todoApi = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  },

  // Create new todo
  createTodo: async (todo: InsertTodo): Promise<Todo> => {
    const response = await apiRequest("POST", "/api/todos", todo);
    return response.json();
  },

  // Update todo
  updateTodo: async (id: string, todo: InsertTodo): Promise<Todo> => {
    const response = await apiRequest("PUT", `/api/todos/${id}`, todo);
    return response.json();
  },

  // Toggle todo completion
  toggleTodo: async (id: string, completed: boolean): Promise<Todo> => {
    const response = await apiRequest("PATCH", `/api/todos/${id}`, { completed });
    return response.json();
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<void> => {
    await apiRequest("DELETE", `/api/todos/${id}`);
  },
};
