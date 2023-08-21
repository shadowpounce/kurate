import { pages } from '../pages'
import { Route } from 'react-router-dom'
import { WithRoutes } from './providers/WithRoutes'
import { Layout } from './providers/Layout'

const App = () => {
  return (
    <WithRoutes>
      {pages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <Layout withPreloader={page.withPreloader}>{page.element}</Layout>
          }
        ></Route>
      ))}
    </WithRoutes>
  )
}

export default App
