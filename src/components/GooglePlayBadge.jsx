// "Get it on Google Play" badge in the standard style: black, thin grey border,
// four-colour Play mark, small caps line over the store name.
export default function GooglePlayBadge({ href, className = '' }) {
  return (
    <a
      className={`gplay ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Get it on Google Play"
    >
      <svg className="gplay-mark" viewBox="0 0 22 24" aria-hidden="true">
        <path fill="#4285F4" d="M0.6 0.4 L12.3 12 L0.6 23.6 C0.2 23.3 0 22.8 0 22.2 V1.8 C0 1.2 0.2 0.7 0.6 0.4 Z" />
        <path fill="#34A853" d="M0.6 0.4 C1.1 0 1.8 0 2.5 0.4 L16.1 8.2 L12.3 12 Z" />
        <path fill="#FBBC04" d="M16.1 8.2 L20.6 10.8 C21.5 11.3 21.5 12.7 20.6 13.2 L16.1 15.8 L12.3 12 Z" />
        <path fill="#EA4335" d="M12.3 12 L16.1 15.8 L2.5 23.6 C1.8 24 1.1 24 0.6 23.6 Z" />
      </svg>
      <span className="gplay-text">
        <small>GET IT ON</small>
        <b>Google Play</b>
      </span>
    </a>
  )
}

export const isPlayStore = (url) => typeof url === 'string' && url.includes('play.google.com')
