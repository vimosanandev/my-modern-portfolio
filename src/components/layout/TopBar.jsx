import { personalInfo } from '../../data/portfolio'
import Icon from '../Icon'

export default function TopBar() {
  return (
    <div className="topbar">
      <label className="search">
        <Icon name="search" />
        <input id="site-search" type="search" placeholder="Search projects, stacks, companies" />
      </label>
      <span className="spacer" />
      <a className="icon-btn" href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
      <a className="icon-btn" href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
      <a className="icon-btn badge-dot" href={`mailto:${personalInfo.email}`} aria-label="Email"><Icon name="chat" /></a>
      <a className="pill pill-grad" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
        + Download CV
      </a>
    </div>
  )
}
