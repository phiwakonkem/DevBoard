import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { moveTask, addTask, deleteTask, type Status, type Priority } from '../store/tasksSlice'
import type { RootState } from '../store/store'

const columns: { id: Status; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'border-gray-600' },
  { id: 'inprogress', label: 'In Progress', color: 'border-violet-500' },
  { id: 'done', label: 'Done', color: 'border-emerald-500' },
]

const priorityColors: Record<Priority, string> = {
  low: 'bg-gray-700 text-gray-300',
  medium: 'bg-amber-900 text-amber-300',
  high: 'bg-rose-900 text-rose-300',
}

export default function KanbanBoard() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => (state as RootState).tasks.items)
  const [dragging, setDragging] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' as Priority })

  const handleAddTask = () => {
    if (!form.title.trim()) return
    dispatch(addTask({ ...form, status: 'todo' }))
    setForm({ title: '', description: '', priority: 'medium' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6 flex flex-col gap-3">
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500"
            placeholder="Task title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as Priority[]).map(p => (
              <button
                key={p}
                onClick={() => setForm(f => ({ ...f, priority: p }))}
                className={`text-xs px-3 py-1 rounded-full capitalize transition-colors ${
                  form.priority === p ? priorityColors[p] : 'bg-gray-800 text-gray-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddTask} className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
              Add
            </button>
            <button onClick={() => setShowForm(false)} className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {columns.map(col => (
          <div
            key={col.id}
            className={`bg-gray-900 rounded-xl border-t-2 ${col.color} p-4 min-h-96`}
            onDragOver={e => e.preventDefault()}
            onDrop={() => dragging && dispatch(moveTask({ id: dragging, status: col.id }))}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-400">{col.label}</h2>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                {(tasks as any[]).filter((t: any) => t.status === col.id).length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {(tasks as any[])
                .filter((t: any) => t.status === col.id)
                .map((task: any) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDragging(task.id)}
                    onDragEnd={() => setDragging(null)}
                    className="bg-gray-800 rounded-lg p-4 cursor-grab active:cursor-grabbing border border-gray-700 hover:border-violet-500 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-sm">{task.title}</p>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${priorityColors[task.priority as Priority]}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => dispatch(deleteTask(task.id))}
                          className="text-gray-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 text-xs"
                        >
                          ✕
                        </button>
                      </div>
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