export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  taglines: [
    'Building elegant digital experiences.',
    'Crafting performant web applications.',
    'Turning ideas into reality.',
  ],
  email: 'you@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  resumeUrl: '/assets/resume.pdf',
  avatar: null, // set to '/assets/avatar.jpg' once you add your photo
}

export const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description:
      'A full-stack web application that solves real-world problems with a clean, intuitive interface and robust backend.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: null,
    githubUrl: 'https://github.com/yourusername/project-alpha',
    liveUrl: 'https://project-alpha.vercel.app',
    featured: true,
  },
  {
    id: 2,
    title: 'Project Beta',
    description:
      'A mobile-first progressive web app with offline capabilities and real-time synchronization across devices.',
    tags: ['TypeScript', 'Next.js', 'Redis'],
    image: null,
    githubUrl: 'https://github.com/yourusername/project-beta',
    liveUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Project Gamma',
    description:
      'An open-source CLI tool that automates repetitive development tasks, saving hours of manual work each week.',
    tags: ['Python', 'CLI', 'Open Source'],
    image: null,
    githubUrl: 'https://github.com/yourusername/project-gamma',
    liveUrl: null,
    featured: false,
  },
]

export const skills = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Backend' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend' },
  { name: 'Docker', icon: '🐋', category: 'DevOps' },
  { name: 'GitHub Actions', icon: '⚙️', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', category: 'DevOps' },
  { name: 'Git', icon: '📦', category: 'Tools' },
  { name: 'VS Code', icon: '🖥️', category: 'Tools' },
  { name: 'Figma', icon: '🎭', category: 'Tools' },
]

export const skillCategories = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools']
