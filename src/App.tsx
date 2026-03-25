import { Routes, Route } from 'react-router-dom'
import BootPage from './pages/BootPage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AllCertificationsPage from './pages/AllCertificationsPage'
import Layout from './components/Layout'

function App() {
  return (
    <>
      {/* Ambient background applied globally behind all views */}
      <div className="ambient-bg">
        <div className="ambient-noise"></div>
      </div>

      <Routes>
        <Route path="/" element={<BootPage />} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/certifications" element={<Layout><AllCertificationsPage /></Layout>} />
      </Routes>
    </>
  )
}

export default App
