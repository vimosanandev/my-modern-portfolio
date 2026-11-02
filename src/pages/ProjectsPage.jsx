import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, companies, companyById, personalInfo } from '../data/portfolio'
import PhoneMock from '../components/PhoneMock'
import Icon from '../components/Icon'

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function ProjectsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const list = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.company === filter)),
    [filter]
  )

  const hashId = location.hash.replace('#', '')
  const index = Math.max(0, list.findIndex((p) => p.id === hashId))
  const p = list[index] || list[0]
  const co = companyById[p.company]

  const go = (i) => {
    const next = list[(i + list.length) % list.length]
    navigate({ hash: next.id }, { replace: true })
  }

  // Keep hash valid when the filter changes.
  useEffect(() => {
    if (!list.some((x) => x.id === hashId)) navigate({ hash: list[0].id }, { replace: true })
  }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Projects · {projects.length} apps</span>
        <div className="filters">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
          {companies.map((c) => (
            <button key={c.id} className={filter === c.id ? 'on' : ''} onClick={() => setFilter(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <section className="reader card">
        <div className="shelf">
          <div className="arrows">
            <button onClick={() => go(index - 1)} aria-label="Previous project">↑</button>
            <button onClick={() => go(index + 1)} aria-label="Next project">↓</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={p.id} variants={fade} initial="hidden" animate="show" exit="exit">
              <PhoneMock platform={p.platform} device={p.device} screen={p.screen} image={p.image} photo={p.photo} photoTilt={p.photoTilt} withCase tilt className="shelf-phone" />
            </motion.div>
          </AnimatePresence>
          <span className="counter">{index + 1} / {list.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="copy" variants={fade} initial="hidden" animate="show" exit="exit">
            <div className="crumb">
              <i>{co.short}</i>
              <span>{co.name} · {p.year} · {p.platform === 'ios' ? 'iOS' : 'Android'}</span>
            </div>
            <h1>{p.title}</h1>
            <p className="role">{p.role}</p>
            <p className="lead">{p.lead}</p>

            <div className="cta">
              {p.liveUrl ? (
                <a className="pill pill-dark" href={p.liveUrl} target="_blank" rel="noreferrer">Open in store <Icon name="external" size={16} /></a>
              ) : (
                <a className="pill pill-dark" href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(p.title)}`}>Ask me about it <Icon name="send" size={16} /></a>
              )}
              <span className="spacer" />
              <button className="icon-btn" onClick={() => go(index - 1)} aria-label="Previous"><Icon name="chevron" style={{ transform: 'rotate(180deg)' }} /></button>
              <button className="icon-btn" onClick={() => go(index + 1)} aria-label="Next"><Icon name="chevron" /></button>
            </div>

            <div className="meta">
              <div className="desc">
                <h4>Description</h4>
                {p.story.map((para, i) => <p key={i}>{para}</p>)}
                <h4 style={{ marginTop: 18 }}>What I did</h4>
                <ul>{p.did.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
              <dl>
                <div>
                  <dt>Stack</dt>
                  <dd className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</dd>
                </div>
                <div>
                  <dt>Release</dt>
                  <dd>{p.release.store}<br />{p.release.status}<br />{p.release.devices}</dd>
                </div>
                <div>
                  <dt>Company</dt>
                  <dd>{co.name}<br />{co.location}<br />{co.period}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section>
        <h2 className="section-h" style={{ marginBottom: 12 }}>All projects</h2>
        <div className="thumbs">
          {list.map((x, i) => (
            <button key={x.id} className={`thumb${x.id === p.id ? ' on' : ''}`} onClick={() => go(i)}>
              <div className="thumb-box"><PhoneMock platform={x.platform} device={x.device} screen={x.screen} image={x.image} photo={x.photo} className="thumb-phone" /></div>
              <b>{x.title}</b>
              <small>{companyById[x.company].short} · {x.year}</small>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
