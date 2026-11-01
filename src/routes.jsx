import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SectionPage from './pages/SectionPage'
import PhotosPage from './pages/PhotosPage'
import TravelsPage from './pages/TravelsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/education" element={<SectionPage id="education" />} />
        <Route path="/technical" element={<SectionPage id="technical" />} />
        <Route path="/companies" element={<SectionPage id="companies" />} />
        <Route path="/personal" element={<SectionPage id="personal" />} />
      </Route>
      {/* Legacy standalone pages, still dark themed. Fold into Personal later. */}
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/travels" element={<TravelsPage />} />
    </Routes>
  )
}
