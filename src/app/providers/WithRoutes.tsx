import { BrowserRouter, Routes } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
}

export const WithRoutes: React.FC<IProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>{children}</Routes>
    </BrowserRouter>
  )
}
