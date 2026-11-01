import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { personalInfo, companies, schools, tiles, projects, companyById } from '../data/portfolio'
import PhoneMock from '../components/PhoneMock'
import Icon from '../components/Icon'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' } }),
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="greet">
          <img className="avatar" src={personalInfo.avatar} alt="" />
          <div>
            <small>{greeting()}, I'm</small>
            <b>{personalInfo.firstName} 👋</b>
          </div>
        </div>

        <div className="wallet">
          <div>
            <small>Years shipping Android</small>
            <b>{personalInfo.years}<span style={{ fontSize: 14, opacity: 0.7 }}>yrs</span></b>
          </div>
          <div className="sub">{personalInfo.stats.apps} apps · Play Store + App Store</div>
          <a className="cta" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">+ Download CV</a>
        </div>

        <div className="banner">
          <div><b>Build anything, any platform</b><small>Android, Flutter or iOS</small></div>
          <div className="logos"><span>Kt</span><span>Fl</span><span>Sw</span></div>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 800 }}>What do you want to see today?</h3>
        <div className="tiles">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className={`tile tile-${t.tone}`}>
              <div className="art">{t.chips.map((c) => <span key={c}>{c}</span>)}</div>
              <div><b>{t.title}</b><small>{t.sub}</small></div>
              <span className="go">→</span>
            </Link>
          ))}
        </div>

        <Link to="/education" className="card where">
          <Icon name="pin" />
          <div><b>Where to?</b><small>Education · Texas Tech MS CS, GPA 3.92</small></div>
          <Icon name="chevron" className="chev" />
        </Link>
      </div>

      <div className="hero-phones">
        <span className="eyebrow">Currently running</span>
        <div className="duo">
          <PhoneMock platform="android" screen="kds" withCase label="Android · Kotlin" className="duo-android" />
          <PhoneMock platform="ios" screen="fynkle" withCase label="iOS · Flutter" className="duo-ios" />
        </div>
      </div>
    </section>
  )
}

function Stories() {
  const items = [
    ...companies.map((c) => ({ ...c, to: `/companies#${c.id}` })),
    ...schools.map((s) => ({ ...s, to: `/education#${s.id}` })),
  ]
  return (
    <section>
      <h2 className="section-h" style={{ marginBottom: 12 }}>Companies</h2>
      <div className="stories">
        <Link to="/personal" className="story">
          <span className="story-ring"><i><img src={personalInfo.avatar} alt="" className="avatar" /></i></span>
          <small>My story</small>
        </Link>
        {items.map((c, i) => (
          <motion.div key={c.id} custom={i} initial="hidden" animate="show" variants={rise}>
            <Link to={c.to} className={`story${c.seen ? ' seen' : ''}`}>
              <span className="story-ring"><i>{c.short}</i></span>
              {c.current && <span className="live">NOW</span>}
              <small>{c.name}</small>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Post({ p, i }) {
  const co = companyById[p.company]
  const [first, second, ...rest] = p.tags
  return (
    <motion.article className="card post" custom={i} initial="hidden" animate="show" variants={rise}>
      <div className="who">
        <i>{co.short}</i>
        <div><b>{p.title}</b><small>{co.name} · {p.year}</small></div>
        <span className="dots">···</span>
      </div>
      <Link to={`/projects#${p.id}`} className="shot">
        <PhoneMock platform={p.platform} screen={p.screen} style={{ width: 118, transform: 'translateY(20px)' }} />
      </Link>
      <div className="acts">
        <Icon name="heart" /><Icon name="chat" /><Icon name="send" />
        {p.liveUrl ? (
          <a className="save" href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Open in store"><Icon name="external" /></a>
        ) : (
          <Icon name="bookmark" className="save" />
        )}
      </div>
      <p className="cap">
        <b>Built with</b> {first}, {second}{rest.length ? ` and ${rest.length} others` : ''}
        <br />{p.summary}
      </p>
    </motion.article>
  )
}

function Feed() {
  const featured = projects.filter((p) => p.featured)
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
        <h2 className="section-h">Projects</h2>
        <Link to="/projects" style={{ color: 'var(--color-muted)', fontSize: 13 }}>See all {projects.length} →</Link>
      </div>
      <div className="feed">
        {featured.map((p, i) => <Post key={p.id} p={p} i={i} />)}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stories />
      <Feed />
    </>
  )
}
