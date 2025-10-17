# Task Management App

A modern, intuitive task management application built with React, TypeScript, and Material-UI. Organize your projects with customizable sections and drag-and-drop task management.

> **⚠️ Work in Progress**: This project is currently under development. See the [Current Status](#-current-status) section below for what's implemented and what's planned.

## 🚀 Features

### ✅ Currently Implemented
- **Project Management**: Create, edit, and delete projects with descriptions
- **Section Organization**: Each project contains multiple customizable sections (e.g., "To Do", "In Progress", "Completed")
- **Drag & Drop Sections**: Reorder project sections with smooth drag-and-drop functionality
- **Modern UI**: Clean, responsive interface built with Material-UI and Tailwind CSS
- **Real-time Updates**: Instant UI updates with Redux Toolkit state management
- **Toast Notifications**: User-friendly feedback for all actions
- **Project Navigation**: Navigate between projects and project details

### 🚧 Planned Features
- **Task Management**: Create, edit, and delete tasks within project sections
- **Task Drag & Drop**: Move tasks between sections with drag-and-drop functionality
- **Task Details**: Add descriptions, due dates, and priorities to tasks
- **Search & Filter**: Find projects and tasks quickly with built-in search functionality
- **Task Status Tracking**: Visual indicators for task completion status

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1, TypeScript
- **UI Framework**: Material-UI (MUI) v7, Tailwind CSS
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router v7
- **Drag & Drop**: @dnd-kit
- **Build Tool**: Vite
- **Backend**: JSON Server (for development)
- **Notifications**: React Toastify

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server

#### Option A: Start Both Frontend and Backend
```bash
# Terminal 1 - Start JSON Server (Backend)
npm run server

# Terminal 2 - Start React Development Server
npm run dev
```

#### Option B: Start Individual Services
```bash
# Start JSON Server only (runs on port 3001)
npm run server

# Start React app only (runs on port 5173)
npm run dev
```

### 4. Access the Application
- **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **Backend API**: Available at [http://localhost:3001](http://localhost:3001)

## 📊 Current Status

### ✅ Completed Features
- **Project CRUD Operations**: Full create, read, update, delete functionality for projects
- **Project Section Management**: Add, edit, delete, and reorder project sections
- **Drag & Drop for Sections**: Sections can be reordered using drag-and-drop
- **Responsive UI**: Clean, modern interface with Material-UI components
- **State Management**: Redux Toolkit integration with RTK Query for API calls
- **Navigation**: React Router setup with proper routing between pages
- **Backend Integration**: JSON Server setup for development API

### 🚧 In Development
- **Task Management Interface**: The Tasks page currently only shows project header
- **Task CRUD Operations**: Task creation, editing, and deletion functionality
- **Task Drag & Drop**: Moving tasks between sections
- **Task Data Model**: Task interfaces and API endpoints

### 📋 Next Steps
1. Implement task data models and interfaces
2. Create task management components
3. Add task CRUD operations to the API
4. Implement task drag-and-drop between sections
5. Add task details and status management
6. Implement search and filtering functionality

## 📖 Usage

### Creating a Project
1. Navigate to the Projects page
2. Click "Add Project" button
3. Fill in the project name and description
4. Click "Create Project"

### Managing Project Sections
1. Open a project for editing (click the edit icon)
2. Add new sections using the "Add Section" button
3. Rename sections by editing the text field
4. Delete sections (except the last one) using the delete icon
5. Drag sections to reorder them using the drag handle

### Task Management (Coming Soon)
> **Note**: Task management functionality is currently being developed. The Tasks page exists but task operations are not yet implemented.

1. Navigate to a project's task view
2. Create tasks within different sections
3. Drag tasks between sections to update their status
4. Edit task details inline
5. Delete tasks when completed

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3001 (JSON Server)
npx kill-port 3001

# Kill process on port 5173 (Vite)
npx kill-port 5173
```

**Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Check TypeScript errors
npm run lint

# Clear build cache
rm -rf dist
npm run build
```

---

**Happy Task Managing! 🎯**