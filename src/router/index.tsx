import { Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
const load = (C: React.FC) => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        />
      }
    >
      <C />
    </Suspense>
  )
}
const routes = [
  {
    path: '/',
    element: load(lazy(() => import('@/layout'))),
    children: [
      {
        path: '/',
        element: <Navigate to="/command" />,
      },
      {
        path: 'command',
        element: load(lazy(() => import('@/pages/command'))),
        label: 'command',
      },
      {
        path: 'chat',
        element: load(lazy(() => import('@/pages/chat'))),
        label: 'chat',
      },
      {
        path: 'setting',
        element: load(lazy(() => import('@/pages/setting'))),
        label: 'setting',
      },
    ],
  },
  {
    path: '/login',
    element: load(lazy(() => import('@/pages/login'))),
  },
]
const Router = () => {
  return useRoutes(routes)
}
export default Router
