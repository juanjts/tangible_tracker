import { useNavigate } from 'react-router-dom'

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

function TaskCard({ task }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 hover:shadow-md hover:border-neutral-300 transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-neutral-900 leading-tight">
          {task.title}
        </h3>
        <span className={`ml-3 shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] || ''}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[task.status] || ''}`}>
          {task.status}
        </span>
        <span className="text-xs text-neutral-400 truncate">
          {task.responsible?.email}
        </span>
      </div>
    </div>
  )
}

export default TaskCard
