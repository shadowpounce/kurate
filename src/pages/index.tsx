import { Artists } from './Artists/Artists'
import { Careers } from './Careers/Careers'
import { Home } from './Home/Home'

export const pages = [
  {
    title: 'Home',
    path: '/',
    element: <Home />,
    withFullpageScroll: true,
  },
  {
    title: 'Careers',
    path: '/careers',
    element: <Careers />,
  },
  {
    title: 'Artists',
    path: '/artists',
    element: <Artists />,
  },
]
