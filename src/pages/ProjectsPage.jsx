import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, companies, companyById, personalInfo } from '../data/portfolio'
import PhoneMock from '../components/PhoneMock'
import Icon from '../components/Icon'
import GooglePlayBadge, { isPlayStore } from '../components/GooglePlayBadge'
import BrandMark from '../components/BrandMark'
import AppStoreBadge from '../components/AppStoreBadge'

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// Must match `.reader .meta::before { top }` in index.css (paper starts this far above the meta block).
const PAPER_LIFT = 26
// Share of a landscape tablet's height that sits above the white paper.
const TABLET_ABOVE = 0.7

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

  // Where the white paper starts, measured from the top of the device column's content.
  // A landscape tablet is placed from it (--tablet-mt) so 70% of the device sits above the paper
  // and 30% on it, whatever the render's shape.
  const readerRef = useRef(null)
  useEffect(() => {
    const reader = readerRef.current
    if (!reader) return
    // Layout position inside the reader. offsetTop ignores transforms, so the copy's slide-in
    // animation can't skew the result.
    const topIn = (el) => {
      let y = 0
      for (let n = el; n && n !== reader; n = n.offsetParent) y += n.offsetTop
      return y
    }
    const measure = () => {
      const shelf = reader.querySelector('.shelf')
      const meta = reader.querySelector('.meta')
      if (!shelf || !meta) return
      const padTop = parseFloat(getComputedStyle(shelf).paddingTop) || 0
      const paperY = topIn(meta) - PAPER_LIFT - topIn(shelf) - padTop
      reader.style.setProperty('--paper-y', `${Math.round(paperY)}px`)
      const tablet = shelf.querySelector('.phone-photo-tablet')
      if (tablet && tablet.offsetHeight) {
        reader.style.setProperty('--tablet-mt', `${Math.round(paperY - TABLET_ABOVE * tablet.offsetHeight)}px`)
      }
    }
    measure()
    // Re-measure when text rewraps (width change), the copy swaps project, or a device image loads.
    const ro = new ResizeObserver(measure)
    ro.observe(reader)
    const shelfEl = reader.querySelector('.shelf')
    if (shelfEl) ro.observe(shelfEl)
    reader.addEventListener('load', measure, true)
    const timers = [setTimeout(measure, 200), setTimeout(measure, 600)]
    return () => {
      ro.disconnect()
      reader.removeEventListener('load', measure, true)
      timers.forEach(clearTimeout)
    }
  }, [p.id])

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

      <section className="reader card" ref={readerRef}>
        <div className="shelf">
          <AnimatePresence mode="wait">
            <motion.div key={p.id} variants={fade} initial="hidden" animate="show" exit="exit">
              {p.extra ? (
                <div className="shelf-duo">
                  {/* `extraFirst` puts the second device in front on the left, so the pair still faces inward. */}
                  <PhoneMock
                    photo={p.extraFirst ? p.extra.photo : p.photo}
                    photoTilt={p.extraFirst ? p.extra.photoTilt : p.photoTilt}
                    tilt className="shelf-phone duo-front"
                  />
                  <PhoneMock
                    photo={p.extraFirst ? p.photo : p.extra.photo}
                    photoTilt={p.extraFirst ? p.photoTilt : p.extra.photoTilt}
                    tilt className="shelf-phone duo-back"
                  />
                </div>
              ) : (
                <PhoneMock platform={p.platform} device={p.device} screen={p.screen} image={p.image} photo={p.photo} photoTilt={p.photoTilt} withCase tilt className="shelf-phone" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="copy" variants={fade} initial="hidden" animate="show" exit="exit">
            <div className="crumb">
              <i>{co.short}</i>
              <span>{co.name} · {p.year} · {p.platformLabel || (p.platform === 'ios' ? 'iOS' : 'Android')}</span>
            </div>
            <h1>{p.title}</h1>
            <p className="role">{p.role}</p>
            <p className="lead">{p.lead}</p>
            {p.note && (
              <p className="avail-note">
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 11v5M12 8h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                {p.note}
              </p>
            )}

            <div className="cta">
              {isPlayStore(p.liveUrl) || p.appStoreUrl ? (
                <span className="store-badges">
                  {isPlayStore(p.liveUrl) && <GooglePlayBadge href={p.liveUrl} />}
                  {p.appStoreUrl && <AppStoreBadge href={p.appStoreUrl} />}
                </span>
              ) : p.liveUrl ? (
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
                <ul className="did">
                  {p.did.map((d, i) => (
                    <li key={i}>
                      <span className="did-mark" aria-hidden="true">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 8.4l2.6 2.5L12 5.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <div>
                        <b>{typeof d === 'string' ? d : d.t}</b>
                        {typeof d !== 'string' && <p>{d.d}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
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
                  {(co.website || co.linkedin) && (
                    <dd className="co-links">
                      {co.linkedin && (
                        <a className="co-link" href={co.linkedin} target="_blank" rel="noreferrer">
                          <BrandMark name="linkedin" size={26} title="" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {co.website && (
                        <a className="co-link" href={co.website} target="_blank" rel="noreferrer">
                          <span className="co-globe"><Icon name="globe" size={15} /></span>
                          <span>{co.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                        </a>
                      )}
                    </dd>
                  )}
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
