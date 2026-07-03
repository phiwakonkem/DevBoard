# DevBoard

A Kanban-style developer task board with drag-and-drop columns, priority filtering, and real server-state management — built to talk to a live REST API rather than relying on mocked local state.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## Features

- **Kanban board** — three columns (To Do, In Progress, Done) with drag-and-drop task movement
- **Task creation** — title, description, and priority (low / medium / high)
- **Priority filtering** — filter the board by task priority
- **Server-state management** — TanStack Query handles fetching, caching, and cache invalidation against a live backend
- **Global state** — a Redux Toolkit slice models the task shape and local UI state
- **React Query Devtools** included for inspecting cache state during development

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Server state | TanStack Query 5 |
| Client state | Redux Toolkit + React-Redux |
| HTTP client | Axios |
| Routing | React Router 7 |

## Backend

This repository is the **frontend only**. It's built to talk to a REST API at:

```
http://localhost:8080/api
```

The matching backend is published separately: **[DevBoard-API](https://github.com/phiwakonkem/DevBoard-API)** — a Go (Gin) service implementing exactly this contract.

The frontend calls the following endpoints (see `src/api/tasks.ts`):

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/tasks` | Fetch all tasks |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/:id/move` | Move a task between columns (update status) |
| `DELETE` | `/tasks/:id` | Delete a task |

A `Task` is expected to have at least: `id`, `title`, `description`, `status` (`todo` / `in-progress` / `done`), `priority` (`low` / `medium` / `high`), and `createdAt`. Without a backend running, the board will load with no tasks and API calls will fail.

## Prerequisites

- Node.js 20 or later
- npm
- [Go 1.26+](https://go.dev/dl/) (to run DevBoard-API)

## Installation

```bash
# 1. Clone and run the backend
git clone https://github.com/phiwakonkem/DevBoard-API.git
cd DevBoard-API
go mod download
go run main.go
# API now running at http://localhost:8080

# 2. In a separate terminal, clone and run the frontend
git clone https://github.com/phiwakonkem/DevBoard.git
cd DevBoard
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (Vite's default port).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
DevBoard/
├── src/
│   ├── api/           # Axios calls to the tasks REST API
│   ├── components/    # KanbanBoard and related UI components
│   ├── store/          # Redux Toolkit store and tasksSlice
│   ├── App.tsx
│   └── main.tsx
├── public/
└── index.html
```

## Related

- Backend: **[DevBoard-API](https://github.com/phiwakonkem/DevBoard-API)**

## Roadmap

- [ ] Add task editing and due dates
- [ ] Add user authentication so boards are per-user
- [ ] Persist tasks in DevBoard-API to a real database (currently in-memory)

## Author

**Phiwakonke Mthethwa** — Full-Stack Developer, South Africa
[GitHub](https://github.com/phiwakonkem) · [LinkedIn](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331) · phiwakonkem@gmail.com

## License

MIT
