import { useState, useEffect, useCallback, useMemo } from 'react'
import { list, remove } from '../services/tasksService'
import TaskCard from '../components/tasks/TaskCard'
import TaskForm from '../components/tasks/TaskForm'
import TaskFilters from '../components/tasks/TaskFilters'
import LoadingState from '../components/common/LoadingState'
import ErrorState from '../components/common/ErrorState'
import EmptyState from '../components/common/EmptyState'

function TasksListPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' })

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (!task.title.toLowerCase().includes(q)) return false
      }
      if (filters.status && task.status !== filters.status) return false
      if (filters.priority && task.priority !== filters.priority) return false
      return true
    })
  }, [tasks, filters])

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
    return <LoadingState message="Cargando tareas..." />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  const hasActiveFilters = filters.search || filters.status || filters.priority

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-800">
          Tareas
        </h1>
        <div className="flex items-center gap-4">
          {hasActiveFilters ? (
            <span className="text-sm text-neutral-400">
              {filteredTasks.length} de {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </span>
          ) : (
            <span className="text-sm text-neutral-400">
              {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </span>
          )}
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

      <TaskFilters filters={filters} onFilterChange={setFilters} />

      {filteredTasks.length === 0 ? (
        <div>
          {hasActiveFilters ? (
            <EmptyState
              message="No se encontraron tareas con los filtros actuales"
              action={{ label: 'Limpiar filtros', onClick: () => setFilters({ search: '', status: '', priority: '' }) }}
            />
          ) : (
            <EmptyState message="No hay tareas registradas" />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TasksListPage
