import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { skills, skillCategories } from '../data/portfolio'
import { fadeInLeft, sectionViewport } from '../utils/animations'

function SkillBadge({ skill }) {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', stiffness: 200, damping: 20 },
        },
      }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 16px rgba(34,211,238,0.25)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.6rem 1rem',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.75rem',
        cursor: 'default',
        userSelect: 'none',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
    >
      <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{skill.icon}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, sectionViewport)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="section-padding" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '2rem' }}
        >
          <p style={{ color: '#22d3ee', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What I work with
          </p>
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.825rem',
                fontWeight: 500,
                cursor: 'pointer',
                border: '1px solid',
                transition: 'all 0.2s',
                background: activeCategory === cat ? 'rgba(168,85,247,0.2)' : 'transparent',
                borderColor: activeCategory === cat ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.15)',
                color: activeCategory === cat ? '#a855f7' : 'rgba(255,255,255,0.55)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
