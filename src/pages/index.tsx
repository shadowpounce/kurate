import { Artists } from './Artists/Artists'
import { Careers } from './Careers/Careers'
import { Home } from './Home/Home'
import { Licenses } from './Licenses/Licenses'

export const pages = [
  {
    title: 'Home',
    path: '/',
    element: <Home />,
    withPreloader: true,
    withThreeDCards: true,
  },
  {
    title: 'Careers',
    path: '/careers',
    element: <Careers />,
    withPreloader: false,
  },
  {
    title: 'Artists',
    path: '/artists',
    element: <Artists />,
    withPreloader: false,
  },
  {
    title: 'Licenses',
    path: '/licenses',
    element: <Licenses />,
    withPreloader: false,
  },
]
