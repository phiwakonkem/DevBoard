import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  createdAt: string
}

interface TasksState {
  items: Task[]
}

const initialState: TasksState = {
  items: [
    { id: '1', title: 'Setup AfriHaul Domain', description: 'Entities and interfaces', priority: 'high', status: 'done', createdAt: new Date().toISOString() },
    { id: '2', title: 'Build Application Layer', description: 'CQRS with MediatR', priority: 'high', status: 'inprogress', createdAt: new Date().toISOString() },
    { id: '3', title: 'Setup PostgreSQL', description: 'EF Core + migrations', priority: 'medium', status: 'inprogress', createdAt: new Date().toISOString() },
    { id: '4', title: 'DevBoard Kanban UI', description: 'Drag and drop board', priority: 'high', status: 'done', createdAt: new Date().toISOString() },
    { id: '5', title: 'REST API endpoints', description: 'Shipments CRUD', priority: 'medium', status: 'todo', createdAt: new Date().toISOString() },
    { id: '6', title: 'Go backend for DevBoard', description: 'REST API with Gin', priority: 'high', status: 'todo', createdAt: new Date().toISOString() },
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      state.items.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: Status }>) => {
      const task = state.items.find(t => t.id === action.payload.id)
      if (task) task.status = action.payload.status
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
  },
})

export const { addTask, moveTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer