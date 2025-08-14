import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/todos - Get all todos
  app.get("/api/todos", async (req, res) => {
    try {
      const todos = await storage.getTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  });

  // GET /api/todos/:id - Get single todo
  app.get("/api/todos/:id", async (req, res) => {
    try {
      const todo = await storage.getTodo(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch todo" });
    }
  });

  // POST /api/todos - Create new todo
  app.post("/api/todos", async (req, res) => {
    try {
      const validatedData = insertTodoSchema.parse(req.body);
      const todo = await storage.createTodo(validatedData);
      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create todo" });
    }
  });

  // PUT /api/todos/:id - Update todo
  app.put("/api/todos/:id", async (req, res) => {
    try {
      const validatedData = insertTodoSchema.parse(req.body);
      const todo = await storage.updateTodo(req.params.id, validatedData);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update todo" });
    }
  });

  // PATCH /api/todos/:id - Partially update todo
  app.patch("/api/todos/:id", async (req, res) => {
    try {
      const partialSchema = insertTodoSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const todo = await storage.updateTodo(req.params.id, validatedData);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update todo" });
    }
  });

  // DELETE /api/todos/:id - Delete todo
  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTodo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete todo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
