# Overview

This is a full-stack todo application built with a React frontend and Express.js backend. The application allows users to create, read, update, and delete todo items with features like task filtering, search functionality, and real-time updates. It uses a modern tech stack with TypeScript throughout, shadcn/ui components for the interface, and is configured for both development and production deployment.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation integration

## Backend Architecture  
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with CRUD operations for todos
- **Data Layer**: Abstract storage interface with in-memory implementation (MemStorage)
- **Validation**: Zod schemas shared between client and server
- **Development Server**: Custom Vite integration for HMR in development

## Data Storage
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema**: Single `todos` table with id, title, description, completed status, and timestamps
- **Migrations**: Drizzle Kit for schema migrations
- **Current Implementation**: In-memory storage class that can be swapped for database implementation

## Development & Build System
- **Build Tool**: Vite for frontend, esbuild for backend production builds
- **Package Manager**: npm with lockfile version 3
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Development**: Hot module replacement and runtime error overlays via Replit plugins

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for production database connectivity
- **drizzle-orm**: TypeScript ORM for database operations and migrations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing

### UI and Styling
- **@radix-ui/***: Comprehensive set of headless UI primitives for accessible components
- **tailwindcss**: Utility-first CSS framework with custom design system
- **class-variance-authority**: Type-safe variant handling for component styles
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development tools for enhanced debugging
- **tsx**: TypeScript execution for development server
- **vite**: Frontend build tool and development server

### Validation and Forms
- **zod**: Runtime type validation shared across client and server
- **react-hook-form**: Performant form library with validation integration
- **@hookform/resolvers**: Zod resolver for form validation