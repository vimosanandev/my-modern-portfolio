import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '2rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
        © {year}{' '}
        <span style={{
          background: 'linear-gradient(to right, #a855f7, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 600,
        }}>
          {personalInfo.name}
        </span>
        {' '}— Built with React & Framer Motion
      </p>
    </footer>
  )
}
