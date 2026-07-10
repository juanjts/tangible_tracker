import { useState, useEffect } from 'react'
import { list } from '../services/tasksService'
import TaskCard from '../components/tasks/TaskCard'

function TasksListPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchTasks() {
      try {
        const data = await list()
        if (!cancelled) setTasks(data)
      } catch (err) {
        if (!cancelled) {
          const message = err.response?.data?.error?.message || 'Error al cargar las tareas'
          setError(message)
        }
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
        Cargando tareas...
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

  if (tasks.length === 0) {
    return (
      <div className="p-8">
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
        <h1 className="text-xl font-semibold text-neutral-800">
          Tareas
        </h1>
        <span className="text-sm text-neutral-400">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TasksListPage
