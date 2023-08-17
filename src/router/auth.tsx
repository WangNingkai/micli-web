import appStore from '@/stores/app'
import { useLocation, Navigate } from 'react-router-dom'
const AuthRouter = (props: { children: JSX.Element }) => {
  const user = appStore.user
  const { pathname } = useLocation()
  if (user?.isLogined === false && pathname !== '/login') {
    return <Navigate to="/login" />
  }
  if (user?.isLogined === true) {
    if (pathname === '/login') {
      return <Navigate to="/explorer" />
    }
  }
  if (pathname.indexOf('/dist/index.html') !== -1) {
    return <Navigate to="/" />
  }

  return props.children
}
export default AuthRouter
