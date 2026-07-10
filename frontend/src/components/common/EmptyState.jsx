function EmptyState({ message, action }) {
  return (
    <div className="text-center mt-16">
      <p className="text-neutral-300 text-5xl mb-4">--</p>
      <p className="text-neutral-400 text-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 text-sm text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState
