import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import SiteFooter from './SiteFooter'
import Icon from '../Icon'
import { sections } from '../../data/portfolio'

export default function AppShell() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="content-col">
        <main className="main">
          <TopBar />
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <nav className="bottom-nav">
        {sections.map((s) => (
          <NavLink key={s.id} to={s.to} end={s.to === '/'}>
            <Icon name={s.icon} size={20} />{s.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
