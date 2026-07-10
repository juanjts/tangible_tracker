import { useState, useEffect } from 'react'
import { list } from '../services/tasksService'

const STATUS_STYLES = {
  'To Do': {
    label: 'To Do',
    bg: 'bg-neutral-100',
    text: 'text-neutral-700',
    dot: 'bg-neutral-400',
  },
  'In Progress': {
    label: 'In Progress',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  Done: {
    label: 'Done',
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
}

const PRIORITY_STYLES = {
  High: {
    label: 'High',
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  Medium: {
    label: 'Medium',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  Low: {
    label: 'Low',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key]
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})
}

function StatCard({ count, label, bg, text, dot }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full shrink-0 ${dot}`} />
        <div>
          <p className="text-2xl font-bold text-neutral-900">{count}</p>
          <p className={`text-sm font-medium ${text}`}>{label}</p>
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchTasks() {
      try {
        const data = await list()
        if (!cancelled) setTasks(data)
      } catch {
        if (!cancelled) setError('Error al cargar las tareas')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTasks()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center text-neutral-400 text-sm">
        Cargando dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg mx-8 mt-8">
        {error}
      </div>
    )
  }

  const statusCounts = countBy(tasks, 'status')
  const priorityCounts = countBy(tasks, 'priority')

  if (tasks.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold text-neutral-800 mb-6">Dashboard</h1>
        <div className="text-center mt-16">
          <p className="text-neutral-300 text-5xl mb-4">--</p>
          <p className="text-neutral-400 text-sm">No hay tareas registradas</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-800">Dashboard</h1>
        <span className="text-sm text-neutral-400">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} en total
        </span>
      </div>

      <h2 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">
        Por estado
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {Object.values(STATUS_STYLES).map((style) => (
          <StatCard
            key={style.label}
            count={statusCounts[style.label] || 0}
            {...style}
          />
        ))}
      </div>

      <h2 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">
        Por prioridad
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.values(PRIORITY_STYLES).map((style) => (
          <StatCard
            key={style.label}
            count={priorityCounts[style.label] || 0}
            {...style}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
