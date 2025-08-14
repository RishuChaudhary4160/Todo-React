import { type Todo, type InsertTodo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTodos(): Promise<Todo[]>;
  getTodo(id: string): Promise<Todo | undefined>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, todo: Partial<InsertTodo>): Promise<Todo | undefined>;
  deleteTodo(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private todos: Map<string, Todo>;

  constructor() {
    this.todos = new Map();
  }

  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return this.todos.get(id);
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const id = randomUUID();
    const todo: Todo = {
      ...insertTodo,
      id,
      createdAt: new Date(),
      description: insertTodo.description || "",
    };
    this.todos.set(id, todo);
    return todo;
  }

  async updateTodo(id: string, updates: Partial<InsertTodo>): Promise<Todo | undefined> {
    const existingTodo = this.todos.get(id);
    if (!existingTodo) {
      return undefined;
    }

    const updatedTodo: Todo = {
      ...existingTodo,
      ...updates,
    };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<boolean> {
    return this.todos.delete(id);
  }
}

export const storage = new MemStorage();
