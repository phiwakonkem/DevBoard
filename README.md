# DevBoard

A Kanban-style developer task board with drag-and-drop columns, priority filtering, and real server-state management — built to talk to a real REST API rather than relying on mocked local state.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## Features

- **Kanban board** — three columns (To Do, In Progress, Done) with drag-and-drop task movement
- **Task creation** — title, description, and priority (low / medium / high)
- **Priority filtering** — filter the board by task priority
- **Server-state management** — TanStack Query handles fetching, caching, and invalidation against a live backend
- **Global state** — Redux Toolkit slice models the task shape and local UI state
- **Type-safe end to end** — shared `Task`, `Status`, and `Priority` types across API layer and UI

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Server state | TanStack Query |
| Client state | Redux Toolkit + React Redux |
| HTTP client | Axios |
| Routing | React Router DOM |
| Styling | Tailwind CSS 4 |

## ⚠️ Backend Required

This repository contains the **frontend only**. The app expects a REST API running at:

```
http://localhost:8080/api
```

with the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Fetch all tasks |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/:id/move` | Update a task's status (`todo` / `inprogress` / `done`) |
| `DELETE` | `/tasks/:id` | Delete a task |

A `Task` object has the shape:

```ts
interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'inprogress' | 'done'
  createdAt: string
}
```

The intended backend for this project is a **Go (Gin)** REST API — if you don't have one running yet, you can point `src/api/tasks.ts` at any API matching this contract, or mock it with a tool like [json-server](https://github.com/typicode/json-server).

## Project Structure

```
DevBoard/
├── src/
│   ├── api/
│   │   └── tasks.ts          # Axios calls to the backend API
│   ├── components/
│   │   └── KanbanBoard.tsx   # Main board UI, drag-and-drop, filters
│   ├── store/
│   │   ├── store.ts          # Redux store config
│   │   ├── tasksSlice.ts     # Task types + slice
│   │   └── hooks.ts          # Typed useSelector/useDispatch
│   ├── App.tsx
│   └── main.tsx
└── public/
```

## Getting Started

### Prerequisites

- Node.js 20+
- A running backend matching the API contract above (see [Backend Required](#-backend-required))

### 1. Clone the repository

```bash
git clone https://github.com/phiwakonkem/DevBoard.git
cd DevBoard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Point the app at your backend

By default the API base URL is `http://localhost:8080/api`, set in `src/api/tasks.ts`. Update it there if your backend runs elsewhere.

### 4. Run the development server

```bash
npm run dev
```

Visit the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Roadmap

- [ ] Ship the companion Go (Gin) backend as a public repo
- [ ] Add task editing and deletion from the UI
- [ ] User accounts / multi-board support

## Author

**Phiwakonke Mthethwa**
Full-Stack Developer, Centurion, South Africa

- GitHub: [@phiwakonkem](https://github.com/phiwakonkem)
- LinkedIn: [phiwakonke-mthethwa](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331)
- Email: phiwakonkem@gmail.com
