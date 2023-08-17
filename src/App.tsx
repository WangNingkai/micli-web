import { HashRouter } from 'react-router-dom'
import AuthRouter from '@/router/auth'
import Router from '@/router'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  return (
    <HashRouter basename={'/'}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HashRouter>
  )
})
