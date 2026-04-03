import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { sectionViewport } from '../utils/animations'

const timelineItems = [
  {
    period: 'May 2025 – Present',
    title: 'Senior Mobile Developer',
    subtitle: 'Android · Flutter',
    organization: 'CVS Health',
    location: 'Richardson, TX (Remote)',
    type: 'work',
  },
  {
    period: 'Aug 2024 – May 2025',
    title: 'Senior Mobile Developer',
    subtitle: 'Android',
    organization: 'Vendor Build',
    location: 'San Jose, CA (Remote)',
    type: 'work',
  },
  {
    period: 'Aug 2023 – Jul 2024',
    title: "Master's Degree",
    subtitle: 'Computer Science',
    organization: 'Texas Tech University',
    location: 'Texas, USA',
    type: 'education',
  },
  {
    period: 'Aug 2020 – Jul 2023',
    title: 'Mobile Developer',
    subtitle: 'Android · Flutter',
    organization: 'KooBits Learning (Pvt) Ltd',
    location: 'Singapore',
    type: 'work',
  },
  {
    period: 'May 2018 – Nov 2019',
    title: 'Mobile Developer',
    subtitle: 'Android',
    organization: 'Ellipsis (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    type: 'work',
  },
  {
    period: 'Feb 2013 – Nov 2017',
    title: "Bachelor's Degree",
    subtitle: 'Computer Science & Engineering',
    organization: 'University of Moratuwa',
    location: 'Moratuwa, Sri Lanka',
    type: 'education',
  },
]

function TimelineCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0
  const isEducation = item.type === 'education'
  const accentColor = isEducation ? '#22d3ee' : '#a855f7'
  const startDate = item.period.split('–')[0].trim()

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingLeft: isLeft ? '0' : 'calc(50% + 2rem)',
        paddingRight: isLeft ? 'calc(50% + 2rem)' : '0',
        marginBottom: '2rem',
        position: 'relative',
      }}
    >
      {/* Date label near dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: 'calc(1rem - 0.1rem)',
          left: isLeft ? 'calc(50% + 1.5rem)' : undefined,
          right: isLeft ? undefined : 'calc(50% + 1.5rem)',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: accentColor,
          opacity: 0.75,
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        {startDate}
      </motion.div>

      {/* Dot on the center line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          position: 'absolute',
          left: 'calc(50% - 8px)',
          top: '1rem',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: accentColor,
          border: '3px solid var(--color-dark-base)',
          boxShadow: `0 0 12px ${accentColor}80`,
          zIndex: 2,
        }}
      />

      {/* Connector line from dot to card */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: 'calc(1rem + 5px)',
          left: isLeft ? undefined : 'calc(50% + 8px)',
          right: isLeft ? 'calc(50% + 8px)' : undefined,
          width: '1.5rem',
          height: '2px',
          background: `${accentColor}60`,
          transformOrigin: isLeft ? 'right' : 'left',
          zIndex: 1,
        }}
      />

      {/* Badge above card */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '380px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ marginBottom: '0.4rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: accentColor,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              borderRadius: '9999px',
              padding: '2px 8px',
            }}
          >
            {isEducation ? '🎓 Education' : '💼 Work'}
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="tl-card"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${accentColor}25`,
            borderRadius: '1rem',
            position: 'relative',
          }}
        >
          <div className="tl-period">{item.period}</div>

          <div className="tl-title-row">
            <span className="tl-title">{item.title}</span>
            <span className="tl-subtitle" style={{ color: accentColor }}>
              {item.subtitle}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="tl-org">{item.organization}</span>
            {item.location && (
              <span className="tl-location">, {item.location}</span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, sectionViewport)

  return (
    <section id="timeline" className="section-padding">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
          ref={ref}
        >
          <p
            style={{
              color: '#a855f7',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            My Journey
          </p>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            A timeline of my professional career and academic background.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #a855f7, #22d3ee, #a855f7)',
              transformOrigin: 'top',
              opacity: 0.4,
            }}
          />

          {/* "now" label at top */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '-1.5rem',
              transform: 'translateX(-50%)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#a855f7',
              opacity: 0.7,
            }}
          >
            now
          </div>

          {/* "start" label at bottom */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '-1.5rem',
              transform: 'translateX(-50%)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#a855f7',
              opacity: 0.7,
            }}
          >
            start
          </div>

          {timelineItems.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .tl-card { padding: 0.85rem 1.25rem; }
        .tl-period { font-size: 0.75rem; color: rgba(255,255,255,0.4); font-family: var(--font-mono); margin-bottom: 0.3rem; }
        .tl-title-row { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.3rem; }
        .tl-title { font-size: 1rem; font-weight: 600; color: #fff; }
        .tl-subtitle { font-size: 0.8rem; opacity: 0.85; }
        .tl-org { font-size: 0.875rem; color: rgba(255,255,255,0.65); font-weight: 500; }
        .tl-location { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

        @media (max-width: 767px) {
          .tl-card { padding: 0.6rem 0.85rem; }
          .tl-period { font-size: 0.65rem; margin-bottom: 0.2rem; }
          .tl-title-row { gap: 0.3rem; margin-bottom: 0.2rem; }
          .tl-title { font-size: 0.82rem; }
          .tl-subtitle { font-size: 0.7rem; }
          .tl-org { font-size: 0.75rem; }
          .tl-location { font-size: 0.65rem; }
        }
      `}</style>
    </section>
  )
}
