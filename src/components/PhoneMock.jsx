// CSS-only device frames. `platform` = 'android' | 'ios'. `screen` picks a mock app screen.
// Swap `screen` for a real screenshot later by passing `image`.

function KdsScreen() {
  return (
    <>
      <div className="scr-bar"><span>KDS</span><span>12:40</span></div>
      <div className="scr-kds">
        <div className="scr-tk"><b>#1042 · 2 min</b>2× Masala dosa<br />1× Mango lassi</div>
        <div className="scr-tk wait"><b>#1043 · 6 min</b>1× Kottu roti<br />1× Faluda</div>
        <div className="scr-tk ok"><b>#1041 · ready</b>3× Chicken biryani</div>
        <div className="scr-tk"><b>#1044 · new</b>1× String hoppers</div>
      </div>
      <div className="scr-nav"><b>Open</b><span>Ready</span><span>Done</span></div>
    </>
  )
}

function FynkleScreen() {
  return (
    <>
      <div className="scr-bar"><span>Fynkle</span><span>9:41</span></div>
      <div className="scr-fy">
        <div className="row"><span className="dot" /><b>Dinner near you</b></div>
        <div className="pic" />
        <div className="row"><span className="chip">420 kcal</span><span>fits your target</span></div>
        <div className="row"><span className="dot" /><b>Lunch · Tandoori Hut</b></div>
        <div className="pic alt" />
      </div>
      <div className="scr-nav"><b>Feed</b><span>Map</span><span>Log</span><span>Me</span></div>
    </>
  )
}

function CvsScreen() {
  return (
    <>
      <div className="scr-bar"><span>Photo</span><span>Edit</span></div>
      <div className="scr-fy">
        <div className="pic" style={{ height: 110, background: 'linear-gradient(160deg,#cc0000,#ff5c5c 70%,#ffd6d6)' }} />
        <div className="row"><span className="chip" style={{ background: '#fde2e2', color: '#a40000' }}>IMG.LY</span><span>crop · filter · text</span></div>
        <div className="row"><span className="dot" /><b>Flutter module ⇄ Kotlin</b></div>
      </div>
      <div className="scr-nav"><b>Edit</b><span>Order</span><span>Pickup</span></div>
    </>
  )
}

function KoobitsScreen() {
  return (
    <>
      <div className="scr-bar"><span>KooBits</span><span>Lv 12</span></div>
      <div className="scr-fy">
        <div className="pic" style={{ height: 60, background: 'linear-gradient(135deg,#ffe16b,#ff8a3d)' }} />
        <div className="row"><span className="chip" style={{ background: '#fff3c4', color: '#7a4b00' }}>+40 XP</span><span>streak · 6 days</span></div>
        <div className="row"><span className="dot" /><b>Fractions · Quiz 3</b></div>
        <div className="pic alt" style={{ background: 'linear-gradient(135deg,#bde0ff,#5aa9ff)' }} />
      </div>
      <div className="scr-nav"><b>Learn</b><span>Play</span><span>Badges</span><span>Me</span></div>
    </>
  )
}

const screens = { kds: KdsScreen, fynkle: FynkleScreen, cvs: CvsScreen, koobits: KoobitsScreen }

export default function PhoneMock({ platform = 'android', screen = 'kds', image, label, withCase = false, style, className = '' }) {
  const Screen = screens[screen] || KdsScreen
  return (
    <div className={`phone phone-${platform} ${className}`} style={style}>
      {withCase && <div className="phone-case" />}
      <div className="phone-scr">
        {image ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Screen />}
      </div>
      {label && <span className="phone-label">{label}</span>}
    </div>
  )
}
