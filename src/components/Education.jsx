import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer, sectionViewport } from '../utils/animations'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const educationItems = [
  {
    degree: 'Master of Science',
    field: 'Computer Science',
    institution: 'Texas Tech University',
    location: 'Lubbock, TX, United States',
    period: 'Aug 2023 – Aug 2024',
    gpa: '3.916',
    thesis: null,
  },
  {
    degree: 'Bachelor of Science (Hons)',
    field: 'Computer Science & Engineering',
    institution: 'University of Moratuwa',
    location: 'Colombo, Sri Lanka',
    period: 'Mar 2014 – Nov 2017',
    gpa: null,
    thesis: 'Sentimental Analysis of Twitter using Semi-supervised learning',
    thesisUrl: `${base}/assets/thesis.pdf`,
  },
]

function EducationCard({ item }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(34,211,238,0.15)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        gap: '1.25rem',
        alignItems: 'flex-start',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)'
        e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(34,211,238,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(34,211,238,0.1)',
          border: '1px solid rgba(34,211,238,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1.4rem',
        }}
      >
        🎓
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '0.3rem',
          }}
        >
          {item.period}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '0.3rem',
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{item.degree}</span>
          <span style={{ fontSize: '0.8rem', color: '#22d3ee', opacity: 0.85 }}>{item.field}</span>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
          {item.institution}
          <span
            style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginLeft: '0.4rem' }}
          >
            {item.location}
          </span>
        </div>
        {item.gpa && (
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem' }}>
            GPA: <span style={{ color: '#22d3ee', fontWeight: 600 }}>{item.gpa}</span>
          </div>
        )}
        {item.thesis && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '0.4rem',
              fontStyle: 'italic',
            }}
          >
            Thesis: {item.thesis}
            {item.thesisUrl && (
              <a
                href={item.thesisUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="thesis.pdf"
                style={{
                  marginLeft: '0.5rem',
                  fontStyle: 'normal',
                  color: '#22d3ee',
                  textDecoration: 'none',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  opacity: 0.85,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              >
                Read →
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, sectionViewport)

  return (
    <section id="education" className="section-padding">
      <div style={{ maxWidth: '860px', margin: '0 auto' }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p
            style={{
              color: '#22d3ee',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Academic Background
          </p>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Degrees and institutions that shaped my technical foundation.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {educationItems.map((item) => (
            <EducationCard key={item.institution} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
