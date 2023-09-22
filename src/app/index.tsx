import { pages } from '../pages'
import { Route } from 'react-router-dom'
import { WithRoutes } from './providers/WithRoutes'
import { Layout } from './providers/Layout'

// import * as THREE from 'three'
import createMSDFShader from 'three-bmfont-text/shaders/msdf'
import createGeometry from 'three-bmfont-text'

import { Effect, EffectComposer } from 'postprocessing'
import { useState } from 'react'

// console.log(THREE)

// window.THREE = THREE
window.createGeometry = createGeometry
window.MSDFShader = createMSDFShader
window.Effect = Effect
window.EffectComposer = EffectComposer

const App = () => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)

  return (
    <WithRoutes>
      {pages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <Layout
              setPageLoaded={setPageLoaded}
              pageLoaded={pageLoaded}
              withThreeDCards={page.withThreeDCards}
              withPreloader={page.withPreloader}
            >
              {page.element}
            </Layout>
          }
        ></Route>
      ))}
    </WithRoutes>
  )
}

export default App
