const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const personalInfo = {
  name: 'Vimosanan Ahiladas',
  firstName: 'Vimosanan',
  handle: 'vimosanandev',
  title: 'Senior Android Developer',
  tagline: 'Kotlin · Jetpack Compose · Flutter',
  location: 'Sachse, TX',
  visa: 'H1B · open to C2C',
  email: 'vimosanan.dev@gmail.com',
  github: 'https://github.com/vimosanandev',
  linkedin: 'https://www.linkedin.com/in/vimoahil/',
  phone: 'tel:+18069995417',
  phoneDisplay: '(806) 999-5417',
  resumeUrl: `${base}/assets/v11.0-android(F).pdf`,
  avatar: `${base}/assets/avatar.png`,
  years: 8.5,
  yearsLabel: '8+',
  stats: { years: '8+', companies: 5, apps: 12 },
}

export const highlights = [
  { id: 'android', short: 'Kt', label: 'Android', to: '/technical#android' },
  { id: 'flutter', short: 'Fl', label: 'Flutter', to: '/technical#flutter' },
  { id: 'ios', short: 'iOS', label: 'iOS', to: '/technical#ios' },
  { id: 'fastapi', short: 'Py', label: 'FastAPI', to: '/technical#backend' },
]

export const sections = [
  { id: 'home', label: 'Home', to: '/', icon: 'home' },
  { id: 'projects', label: 'Projects', to: '/projects', icon: 'grid' },
  { id: 'education', label: 'Education', to: '/education', icon: 'cap' },
  { id: 'technical', label: 'Technical', to: '/technical', icon: 'code' },
  { id: 'companies', label: 'Companies', to: '/companies', icon: 'briefcase' },
  { id: 'personal', label: 'Personal', to: '/personal', icon: 'globe' },
]

// Stories row. `current` marks the ring as live.
export const companies = [
  {
    id: 'mammilway',
    short: 'MW',
    name: 'Mammilway Inc',
    role: 'Senior Mobile Developer, Android',
    location: 'Sachse, TX (Remote)',
    period: 'May 2026 - Present',
    current: true,
  },
  {
    id: 'cvs-health',
    short: 'CVS',
    name: 'CVS Health',
    role: 'Senior Mobile Developer, Android & Flutter',
    location: 'Richardson, TX (Remote)',
    period: 'May 2025 - May 2026',
  },
  {
    id: 'vendor-build',
    short: 'VB',
    name: 'Vendor Build',
    role: 'Senior Mobile Developer, Android',
    location: 'San Jose, CA (Remote)',
    period: 'Aug 2024 - Apr 2025',
  },
  {
    id: 'koobits',
    short: 'KB',
    name: 'KooBits',
    role: 'Senior Mobile Developer, Android & Flutter',
    location: 'Singapore',
    period: 'Aug 2020 - Jul 2023',
    seen: true,
  },
  {
    id: 'ellipsis',
    short: 'EL',
    name: 'Ellipsis',
    role: 'Mobile Developer, Android',
    location: 'Colombo, Sri Lanka',
    period: 'May 2018 - Nov 2019',
    seen: true,
  },
]

export const schools = [
  { id: 'ttu', short: 'TTU', name: 'Texas Tech', degree: 'MS Computer Science', period: '2023 - 2024', seen: true },
  { id: 'uom', short: 'UoM', name: 'Moratuwa', degree: 'BSc Eng (Hons) CSE', period: '2014 - 2017', seen: true },
]

// Home tiles, one per section.
export const tiles = [
  { to: '/projects', tone: 'green', title: 'Projects', sub: '12 apps, 5 companies', chips: ['KDS', 'Fynkle', 'POS'] },
  { to: '/technical', tone: 'amber', title: 'Technical', sub: 'Mobile · Backend · Tools', chips: ['Kotlin', 'Compose', 'Hilt'] },
  { to: '/companies', tone: 'violet', title: 'Companies', sub: 'Colombo → Singapore → Texas', chips: ['MW', 'CVS', 'KB'] },
  { to: '/personal', tone: 'blue', title: 'Personal', sub: '5 countries, 3 hobbies', chips: ['🇱🇰', '🇸🇬', '🇺🇸'] },
]

export { projects, projectById } from './projects'

export const companyById = Object.fromEntries(companies.map((c) => [c.id, c]))
