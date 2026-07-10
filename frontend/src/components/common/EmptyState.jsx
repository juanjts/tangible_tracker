function EmptyState({ message, action }) {
  return (
    <div className="text-center mt-16">
      <svg
        className="inline-block w-12 h-12 text-neutral-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
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
