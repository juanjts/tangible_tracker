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
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-semibold text-neutral-800">
            tangible_tracker
          </span>

          <nav className="flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm transition cursor-pointer ${isActive ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `text-sm transition cursor-pointer ${isActive ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`
              }
            >
              Tareas
            </NavLink>

            {user && (
              <>
                <span className="text-sm text-neutral-400">|</span>
                <span className="text-sm text-neutral-500">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
                >
                  Cerrar sesión
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
