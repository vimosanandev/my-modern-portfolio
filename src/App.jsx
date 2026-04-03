import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MenuOverlay from './components/MenuOverlay'

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--color-dark-base)', overflowX: 'hidden' }}>
      {/* Fixed background gradient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.18), transparent)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '-10%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.12), transparent)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Timeline />
          <Projects />
          <Education />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <MenuOverlay />
    </div>
  )
}

export default App
