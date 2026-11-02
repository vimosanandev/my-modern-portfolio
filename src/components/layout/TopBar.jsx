import { personalInfo } from '../../data/portfolio'
import Icon from '../Icon'
import BrandMark from '../BrandMark'

export default function TopBar() {
  return (
    <div className="topbar">
      <label className="search">
        <Icon name="search" />
        <input id="site-search" type="search" placeholder="Search projects, stacks, companies" />
      </label>
      <span className="spacer" />
      <a className="brand-btn" href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><BrandMark name="github" size={36} title="GitHub" /></a>
      <a className="brand-btn" href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BrandMark name="linkedin" size={36} title="LinkedIn" /></a>
      <a className="icon-btn badge-dot" href={`mailto:${personalInfo.email}`} aria-label="Email"><Icon name="chat" /></a>
      <a className="pill pill-grad" href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
        + Download CV
      </a>
    </div>
  )
}
