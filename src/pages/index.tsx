import { Artists } from './Artists/Artists'
import { Careers } from './Careers/Careers'
import { Home } from './Home/Home'

export const pages = [
  {
    path: '/',
    element: <Home />,
    withFullpageScroll: true,
  },
  {
    path: '/careers',
    element: <Careers />,
  },
  {
    path: '/artists',
    element: <Artists />,
  },
]
