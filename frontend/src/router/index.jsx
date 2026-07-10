import { createBrowserRouter, Navigate } from 'react-router-dom'
import IdentityPage from '../pages/IdentityPage'
import DashboardPage from '../pages/DashboardPage'
import TasksListPage from '../pages/TasksListPage'
import TaskDetailPage from '../pages/TaskDetailPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/identity" replace /> },
  { path: '/identity', element: <IdentityPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/tasks', element: <TasksListPage /> },
  { path: '/tasks/:id', element: <TaskDetailPage /> },
])

export default router
