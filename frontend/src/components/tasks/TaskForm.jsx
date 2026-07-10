import { useState, useEffect } from 'react'
import { create, update } from '../../services/tasksService'
import { list as listUsers } from '../../services/usersService'
import { useUser } from '../../context/UserContext'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['To Do', 'In Progress', 'Done']

function TaskForm({ mode, task, onSuccess, onCancel }) {
  const { user } = useUser()
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [title, setTitle] = useState(mode === 'edit' && task ? task.title : '')
  const [description, setDescription] = useState(mode === 'edit' && task ? task.description : '')
  const [priority, setPriority] = useState(mode === 'edit' && task ? task.priority : 'Medium')
  const [status, setStatus] = useState(mode === 'edit' && task ? task.status : 'To Do')
  const [responsibleEmail, setResponsibleEmail] = useState(
    mode === 'edit' && task && task.responsible ? task.responsible.email : '',
  )
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isEdit = mode === 'edit' && task

  useEffect(() => {
    let cancelled = false

    async function fetchUsers() {
      try {
        const data = await listUsers()
        if (!cancelled) setUsers(data)
      } catch {
        if (!cancelled) setError('Error al cargar la lista de usuarios')
      } finally {
        if (!cancelled) setUsersLoading(false)
      }
    }

    fetchUsers()
    return () => { cancelled = true }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('El titulo es obligatorio')
      return
    }

    if (!responsibleEmail) {
      setError('Selecciona un responsable')
      return
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      responsibleEmail,
    }

    setLoading(true)
    try {
      if (isEdit) {
        await update(task.id, taskData)
      } else {
        await create(taskData, user.email)
      }
      onSuccess()
    } catch (err) {
      const message = err.response?.data?.error?.message || (isEdit ? 'Error al guardar los cambios' : 'Error al crear la tarea')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
          Titulo
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo de la tarea"
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
          Descripcion
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripcion opcional"
          rows={3}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 mb-1">
            Prioridad
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition cursor-pointer"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
            Estado
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Propietario
        </label>
        {isEdit ? (
          <p className="text-sm text-neutral-500 py-2">{task.owner.email}</p>
        ) : (
          <p className="text-sm text-neutral-500 py-2">Se asignara automaticamente</p>
        )}
      </div>

      <div>
        <label htmlFor="responsibleEmail" className="block text-sm font-medium text-neutral-700 mb-1">
          Responsable
        </label>
        {usersLoading ? (
          <div className="text-sm text-neutral-400 py-2">Cargando usuarios...</div>
        ) : (
          <select
            id="responsibleEmail"
            value={responsibleEmail}
            onChange={(e) => setResponsibleEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition cursor-pointer"
          >
            <option value="">Seleccionar responsable</option>
            {users.map((u) => (
              <option key={u.id} value={u.email}>{u.email}</option>
            ))}
          </select>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 transition cursor-pointer disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || usersLoading}
          className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {loading ? (isEdit ? 'Guardando...' : 'Creando...') : (isEdit ? 'Guardar cambios' : 'Crear tarea')}
        </button>
      </div>
    </form>
  )
}

TaskForm.defaultProps = {
  mode: 'create',
  task: null,
}

export default TaskForm
