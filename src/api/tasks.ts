import axios from 'axios'
import type { Task, Status } from '../store/tasksSlice'

const api = axios.create({ baseURL: 'http://localhost:8080/api' })

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks')
  return data
}

export const createTaskApi = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const { data } = await api.post('/tasks', task)
  return data
}

export const moveTaskApi = async (id: string, status: Status): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}/move`, { status })
  return data
}

export const deleteTaskApi = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}