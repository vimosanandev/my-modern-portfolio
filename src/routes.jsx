import { Routes, Route } from 'react-router-dom'
import App from './App'
import PhotosPage from './pages/PhotosPage'
import TravelsPage from './pages/TravelsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/travels" element={<TravelsPage />} />
    </Routes>
  )
}
