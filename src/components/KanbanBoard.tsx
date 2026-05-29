import { useState } from 'react'

type Status = 'todo' | 'inprogress' | 'done'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: Status
}

const initialTasks: Task[] = [
  { id: '1', title: 'Setup AfriHaul Domain', description: 'Create entities and interfaces', priority: 'high', status: 'done' },
  { id: '2', title: 'Build Application Layer', description: 'CQRS with MediatR', priority: 'high', status: 'inprogress' },
  { id: '3', title: 'Setup PostgreSQL', description: 'EF Core + migrations', priority: 'medium', status: 'todo' },
  { id: '4', title: 'DevBoard Kanban UI', description: 'Drag and drop board', priority: 'high', status: 'inprogress' },
  { id: '5', title: 'REST API endpoints', description: 'Shipments CRUD', priority: 'medium', status: 'todo' },
]

const columns: { id: Status; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'border-gray-600' },
  { id: 'inprogress', label: 'In Progress', color: 'border-violet-500' },
  { id: 'done', label: 'Done', color: 'border-emerald-500' },
]

const priorityColors = {
  low: 'bg-gray-700 text-gray-300',
  medium: 'bg-amber-900 text-amber-300',
  high: 'bg-rose-900 text-rose-300',
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [dragging, setDragging] = useState<string | null>(null)

  const moveTask = (id: string, status: Status) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status } : t)
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Project Board</h1>
      <div className="grid grid-cols-3 gap-6">
        {columns.map(col => (
          <div
            key={col.id}
            className={`bg-gray-900 rounded-xl border-t-2 ${col.color} p-4 min-h-96`}
            onDragOver={e => e.preventDefault()}
            onDrop={() => dragging && moveTask(dragging, col.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-400">
                {col.label}
              </h2>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {tasks
                .filter(t => t.status === col.id)
                .map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDragging(task.id)}
                    onDragEnd={() => setDragging(null)}
                    className="bg-gray-800 rounded-lg p-4 cursor-grab active:cursor-grabbing
                               border border-gray-700 hover:border-violet-500 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-sm">{task.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}