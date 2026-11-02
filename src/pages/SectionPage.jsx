// Placeholder for the section pages. Each gets its own layout next.
const copy = {
  projects: ['Projects', 'Every app, one per page: phone on the left, story on the right.'],
  education: ['Education', 'Texas Tech and University of Moratuwa.'],
  technical: ['Technical', 'IDEs, Mobile (Android, Flutter, iOS), Backend (FastAPI), Tools (Postman, Bruno).'],
  companies: ['Companies', 'Ellipsis, KooBits, Vendor Build, CVS Health, Mammilway.'],
  personal: ['Personal', 'Countries visited and hobbies.'],
}

export default function SectionPage({ id }) {
  const [title, sub] = copy[id] || [id, '']
  return (
    <section className="page-head">
      <span className="eyebrow">Section</span>
      <h1>{title}</h1>
      <p>{sub}</p>
      <p className="card" style={{ padding: 16, marginTop: 12 }}>Layout coming next.</p>
    </section>
  )
}
