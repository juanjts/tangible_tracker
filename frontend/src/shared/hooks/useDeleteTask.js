import { useState } from 'react'
import { remove } from '../../services/tasksService'

const CONFIRM_MESSAGE = 'Esta accion eliminara la tarea permanentemente. ¿Deseas continuar?'

export function useDeleteTask() {
  const [deleting, setDeleting] = useState(false)

  async function deleteTask(id, onSuccess) {
    if (!window.confirm(CONFIRM_MESSAGE)) return
    setDeleting(true)
    try {
      await remove(id)
      onSuccess?.()
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Error al eliminar la tarea'
      throw message
    } finally {
      setDeleting(false)
    }
  }

  return { deleteTask, deleting }
}
