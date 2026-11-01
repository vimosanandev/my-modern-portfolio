import { NavLink, Link } from 'react-router-dom'
import { personalInfo, highlights, sections } from '../../data/portfolio'
import Icon from '../Icon'

export default function Sidebar() {
  const { stats } = personalInfo
  return (
    <aside className="sidebar">
      <Link to="/" className="brand"><i />{personalInfo.handle}</Link>

      <div className="side-me">
        <img className="avatar" src={personalInfo.avatar} alt={personalInfo.name} />
        <b>{personalInfo.name}</b>
        <small>@{personalInfo.handle}</small>
      </div>

      <div className="side-stats">
        <div><b>{stats.years}</b><small>Years</small></div>
        <div><b>{stats.companies}</b><small>Companies</small></div>
        <div><b>{stats.apps}</b><small>Apps</small></div>
      </div>

      <div className="side-bio">
        <b>{personalInfo.title}</b>
        {personalInfo.tagline}<br />
        {personalInfo.location} · {personalInfo.visa}
      </div>

      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Highlights</div>
        <div className="side-hl">
          {highlights.map((h) => (
            <Link key={h.id} to={h.to}><span>{h.short}</span>{h.label}</Link>
          ))}
        </div>
      </div>

      <nav className="side-nav">
        {sections.map((s) => (
          <NavLink key={s.id} to={s.to} end={s.to === '/'}>
            <Icon name={s.icon} />{s.label}
          </NavLink>
        ))}
        <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
          <Icon name="download" />Resume
        </a>
      </nav>

      <div className="side-foot">© {new Date().getFullYear()} {personalInfo.firstName}</div>
    </aside>
  )
}
