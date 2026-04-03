import { useState, useEffect } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'timeline', 'projects', 'education', 'skills', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[2px] z-50"
        css={{ background: 'linear-gradient(to right, #a855f7, #22d3ee)' }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 50,
          transformOrigin: '0%',
          background: 'linear-gradient(to right, #a855f7, #22d3ee)',
          transform: 'scaleX(0)',
        }}
      />
      {/* Actual progress bar using inline style via JS */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 50,
          background: 'linear-gradient(to right, #a855f7, #22d3ee)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(to right, #a855f7, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            &lt;{personalInfo.name.split(' ')[0]} /&gt;
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
            className="hidden-mobile">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: activeSection === link.href.slice(1)
                    ? '#a855f7'
                    : 'rgba(255,255,255,0.65)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(to right, #a855f7, #22d3ee)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#fff',
                borderRadius: '1px',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 39,
              background: 'rgba(10,10,15,0.95)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: activeSection === link.href.slice(1) ? '#a855f7' : 'rgba(255,255,255,0.8)',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
