import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import KanbanBoard from './components/KanbanBoard'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-950 text-white">
        <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-semibold text-lg tracking-tight">DevBoard</span>
          </div>
          <span className="text-sm text-gray-400">My Workspace</span>
        </header>
        <main className="p-8">
          <KanbanBoard />
        </main>
      </div>
    </QueryClientProvider>
  </StrictMode>
)
