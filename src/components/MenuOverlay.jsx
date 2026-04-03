import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const pages = [
  {
    title: 'Learnings',
    description: 'Notes, articles, and things I picked up along the way.',
    icon: '📚',
    color: '#a855f7',
  },
  {
    title: 'Travels',
    description: "Places I've been, experiences I've collected.",
    icon: '✈️',
    color: '#22d3ee',
  },
  {
    title: 'Hobbies',
    description: "What I do when I'm not writing code.",
    icon: '🎸',
    color: '#f59e0b',
  },
  {
    title: 'Photos',
    description: 'Moments captured through the lens.',
    icon: '📷',
    color: '#ec4899',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function MenuOverlay() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Fixed button stack — bottom right */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid rgba(34,211,238,0.4)',
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px rgba(34,211,238,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          aria-label="Back to top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 11l-5-5-5 5" />
            <path d="M17 18l-5-5-5 5" />
          </svg>
        </motion.button>

        {/* Menu button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid rgba(168,85,247,0.4)',
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 24px rgba(168,85,247,0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          aria-label="Open menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="grid"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(5,5,10,0.92)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{ textAlign: 'center', marginBottom: '2.5rem' }}
              >
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#a855f7',
                    marginBottom: '0.4rem',
                  }}
                >
                  More from me
                </p>
                <h2
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                  }}
                >
                  Personal Space
                </h2>
              </motion.div>

              {/* Cards grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  maxWidth: '720px',
                  width: '100%',
                }}
              >
                {pages.map((page, i) => (
                  <motion.div
                    key={page.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.04, y: -4 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${page.color}20`,
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${page.color}45`
                      e.currentTarget.style.boxShadow = `0 0 24px ${page.color}18`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${page.color}20`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Coming soon badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '9999px',
                        padding: '2px 7px',
                      }}
                    >
                      Soon
                    </span>

                    <div
                      style={{
                        fontSize: '2rem',
                        marginBottom: '0.75rem',
                        lineHeight: 1,
                      }}
                    >
                      {page.icon}
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#fff',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {page.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'rgba(255,255,255,0.4)',
                        lineHeight: 1.5,
                      }}
                    >
                      {page.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
