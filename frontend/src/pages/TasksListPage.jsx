import { useState, useEffect, useCallback } from 'react'
import { list, remove } from '../services/tasksService'
import TaskCard from '../components/tasks/TaskCard'
import TaskForm from '../components/tasks/TaskForm'

function TasksListPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await list()
      setTasks(data)
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Error al cargar las tareas'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  function handleCreated() {
    setShowForm(false)
    fetchTasks()
  }

  async function handleDelete(id) {
    if (!window.confirm('Esta accion eliminara la tarea permanentemente. ¿Deseas continuar?')) return
    try {
      await remove(id)
      fetchTasks()
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Error al eliminar la tarea'
      setError(message)
    }
  }

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-800">
          Tareas
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
          </span>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition cursor-pointer"
          >
            + Nueva tarea
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">
              Nueva tarea
            </h2>
            <TaskForm onSuccess={handleCreated} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {tasks.length === 0 && !showForm ? (
        <div className="text-center mt-16">
          <p className="text-neutral-300 text-5xl mb-4">--</p>
          <p className="text-neutral-400 text-sm">No hay tareas registradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TasksListPage
