import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getById, remove } from '../services/tasksService'
import TaskForm from '../components/tasks/TaskForm'
import LoadingState from '../components/common/LoadingState'
import ErrorState from '../components/common/ErrorState'

const PRIORITY_STYLES = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
}

const STATUS_STYLES = {
  'To Do': 'bg-neutral-100 text-neutral-600',
  'In Progress': 'bg-blue-100 text-blue-700',
  Done: 'bg-green-100 text-green-700',
}

function formatDate(timestamp) {
  if (!timestamp || !timestamp._seconds) return '\u2014'
  const date = new Date(timestamp._seconds * 1000)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEditForm, setShowEditForm] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchTask() {
      try {
        const data = await getById(id)
        if (!cancelled) setTask(data)
      } catch (err) {
        if (!cancelled) {
          const status = err.response?.status
          setError(status === 404 ? 'Tarea no encontrada' : 'Error al cargar la tarea')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTask()
    return () => { cancelled = true }
  }, [id])

  async function handleEditSuccess() {
    const data = await getById(id)
    setTask(data)
    setShowEditForm(false)
  }

  async function handleDelete() {
    if (!window.confirm('Esta accion eliminara la tarea permanentemente. ¿Deseas continuar?')) return
    setDeleteError('')
    setDeleting(true)
    try {
      await remove(id)
      navigate('/tasks', { replace: true })
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Error al eliminar la tarea'
      setDeleteError(message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <LoadingState message="Cargando detalle de la tarea..." />
  }

  if (error) {
    return (
      <div className="p-4 sm:p-8">
        <ErrorState message={error} />
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/tasks')}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition cursor-pointer"
          >
            Volver al listado
          </button>
        </div>
      </div>
    )
  }

  if (!task) return null

  if (showEditForm) {
    return (
      <div className="p-4 sm:p-8 max-w-2xl mx-auto">
        <button
          onClick={() => setShowEditForm(false)}
          className="text-sm text-neutral-500 hover:text-neutral-800 transition cursor-pointer mb-6 inline-block"
        >
          &larr; Cancelar edicion
        </button>
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Editar tarea
          </h2>
          <TaskForm
            mode="edit"
            task={task}
            onSuccess={handleEditSuccess}
            onCancel={() => setShowEditForm(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/tasks')}
        className="text-sm text-neutral-500 hover:text-neutral-800 transition cursor-pointer mb-6 inline-block"
      >
        &larr; Volver al listado
      </button>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
          <h1 className="text-xl font-semibold text-neutral-900">
            {task.title}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition ${PRIORITY_STYLES[task.priority] || ''}`}>
              {task.priority}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition ${STATUS_STYLES[task.status] || ''}`}>
              {task.status}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-400">Propietario</span>
            <p className="text-neutral-800 mt-0.5 break-all">{task.owner?.email}</p>
          </div>
          <div>
            <span className="text-neutral-400">Responsable</span>
            <p className="text-neutral-800 mt-0.5 break-all">{task.responsible?.email}</p>
          </div>
        </div>

        <hr className="my-4 border-neutral-100" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
          <div>
            <span>Creado</span>
            <p className="text-neutral-600 mt-0.5">{formatDate(task.createdAt)}</p>
          </div>
          <div>
            <span>Actualizado</span>
            <p className="text-neutral-600 mt-0.5">{formatDate(task.updatedAt)}</p>
          </div>
          <div>
            <span>Asignado</span>
            <p className="text-neutral-600 mt-0.5">{formatDate(task.assignedAt)}</p>
          </div>
        </div>

        {deleteError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center mt-4">
            {deleteError}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-100">
          <button
            onClick={() => setShowEditForm(true)}
            className="px-4 py-2 text-sm text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPage
