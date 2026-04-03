import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { fadeInUp, staggerContainer } from '../utils/animations'

function TypewriterText({ texts }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 55)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex((i) => (i + 1) % texts.length)
    }

    setDisplayText(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, textIndex, texts])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: '#a855f7', fontWeight: 400 }}
      >|</motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hero glow background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(168,85,247,0.22), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* Text column */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <motion.div variants={fadeInUp}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: '#a855f7',
            }}>
              Available for work
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(to right, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
            }}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'rgba(255,255,255,0.85)',
              minHeight: '1.8em',
              margin: 0,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <TypewriterText texts={personalInfo.taglines} />
          </motion.p>

          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}
          >
            <a href="#projects" className="btn-primary">
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Resume
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', gap: '1rem', paddingTop: '0.25rem' }}
          >
            {[
              { label: 'GitHub', url: personalInfo.github, icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              )},
              { label: 'LinkedIn', url: personalInfo.linkedin, icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              )},
              { label: 'Phone', url: personalInfo.phone, icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
              )},
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Decoration column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '280px', height: '280px' }}>
            {/* Outer glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #a855f7, #22d3ee, #a855f7)',
                padding: '2px',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'var(--color-dark-base)',
              }} />
            </motion.div>

            {/* Avatar or placeholder */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                border: '2px solid rgba(168,85,247,0.3)',
              }}
            >
              {personalInfo.avatar
                ? <img src={personalInfo.avatar} alt={personalInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ userSelect: 'none' }}>👨‍💻</span>
              }
            </motion.div>

            {/* Floating badges */}
            {[
              { label: 'Android', color: '#3ddc84', top: '-10px', right: '-20px' },
              { label: 'Kotlin', color: '#7f52ff', top: '30px', left: '-40px' },
              { label: 'Java', color: '#f89820', bottom: '20px', left: '-30px' },
              { label: 'Flutter', color: '#54c5f8', bottom: '-10px', right: '10px' },
              { label: 'Python', color: '#ffd43b', top: '120px', right: '-40px' },
              { label: 'Dart', color: '#00b4ab', bottom: '80px', left: '-40px' },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                style={{
                  position: 'absolute',
                  top: badge.top,
                  right: badge.right,
                  bottom: badge.bottom,
                  left: badge.left,
                  background: 'rgba(10,10,15,0.9)',
                  border: `1px solid ${badge.color}40`,
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: badge.color,
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 0 12px ${badge.color}20`,
                }}
              >
                {badge.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        Scroll
      </motion.div>
    </section>
  )
}
