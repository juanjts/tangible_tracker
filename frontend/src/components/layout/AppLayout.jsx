import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

function AppLayout() {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/identity', { replace: true })
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
          <span className="text-base sm:text-lg font-semibold text-neutral-800 shrink-0">
            tangible_tracker
          </span>

          <nav className="flex items-center gap-3 sm:gap-6 min-w-0">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm transition cursor-pointer whitespace-nowrap ${isActive ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `text-sm transition cursor-pointer whitespace-nowrap ${isActive ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`
              }
            >
              Tareas
            </NavLink>

            {user && (
              <>
                <span className="hidden sm:inline text-sm text-neutral-400 shrink-0">|</span>
                <span className="hidden sm:block text-sm text-neutral-500 truncate max-w-[120px] lg:max-w-[200px]">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-800 transition cursor-pointer whitespace-nowrap"
                >
                  Salir
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
