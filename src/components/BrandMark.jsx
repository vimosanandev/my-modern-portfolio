// Round brand badges: solid brand-colour circle, white glyph. 24x24 glyph grid inside a circle.
const brands = {
  android: {
    bg: '#78C257',
    glyph: (bg) => (
      <g fill="#fff">
        <path d="M6.6 10.3a5.4 5.4 0 0 1 10.8 0z" />
        <path d="M8.7 5.9 7.6 4.1M15.3 5.9l1.1-1.8" stroke="#fff" strokeWidth=".8" strokeLinecap="round" />
        <circle cx="9.7" cy="8.2" r=".62" fill={bg} />
        <circle cx="14.3" cy="8.2" r=".62" fill={bg} />
        <path d="M6.6 10.9h10.8V17a1.1 1.1 0 0 1-1.1 1.1H7.7A1.1 1.1 0 0 1 6.6 17z" />
        <rect x="4.4" y="10.9" width="1.6" height="5.3" rx=".8" />
        <rect x="18" y="10.9" width="1.6" height="5.3" rx=".8" />
        <rect x="8.7" y="17.2" width="1.7" height="3.4" rx=".85" />
        <rect x="13.6" y="17.2" width="1.7" height="3.4" rx=".85" />
      </g>
    ),
  },
  // Official full-colour Flutter mark on white (geometry from the 1200x1200 brand artwork).
  flutter: {
    bg: '#ffffff',
    ring: '#e4e6ee',
    glyph: () => (
      <g transform="translate(4.3 3.6) scale(0.014)">
        <polygon fill="#42C4FD" points="650,100 950,100 300,750 150,600" />
        <polygon fill="#42C4FD" points="650,550 950,550 675,825 525,675" />
        <polygon fill="#04A9F4" points="525,675 675,825 525,975 375,825" />
        <polygon fill="#02579E" points="675,825 950,1100 650,1100 525,975" />
        <polygon fill="#084994" points="525,975 675,825 750,900" />
      </g>
    ),
  },
  ios: {
    bg: '#111111',
    glyph: () => (
      <path
        fill="#fff"
        transform="translate(5 4.4) scale(0.58)"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    ),
  },
  // GitHub mark: black disc with the Octocat cut out. Drawn as one path, so no background circle.
  github: {
    bg: 'none',
    glyph: () => (
      <path
        fill="#000"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    ),
  },
  // LinkedIn: blue disc, white "in" (proportions taken from the round brand artwork).
  linkedin: {
    bg: '#2867B2',
    glyph: () => (
      <g fill="#fff">
        <circle cx="6.75" cy="6.1" r="1.7" />
        <rect x="5.3" y="9.1" width="2.9" height="9.4" rx=".15" />
        <path d="M10.1 9.1h2.9v1.3c.6-.9 1.8-1.7 3.4-1.7 2 0 2.9 1.5 2.9 3.9v5.9h-2.9v-5.3c0-1.1-.4-1.75-1.3-1.75-1.1 0-2.1.75-2.1 2.05v5H10.1z" />
      </g>
    ),
  },
  fastapi: {
    bg: '#009688',
    glyph: () => <path fill="#fff" d="M13.4 4.5 7.2 13h4.2l-1.2 6.5 6.6-8.9h-4.3z" />,
  },
}

export default function BrandMark({ name, size = 40, title }) {
  const b = brands[name]
  if (!b) return null
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={title || name}>
      <circle cx="12" cy="12" r={b.ring ? 11.7 : 12} fill={b.bg} stroke={b.ring} strokeWidth={b.ring ? 0.6 : 0} />
      {b.glyph(b.bg)}
    </svg>
  )
}
