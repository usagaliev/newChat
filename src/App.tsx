import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/app.routes'
import './App.scss'

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
