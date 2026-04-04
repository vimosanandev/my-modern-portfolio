const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// Add a new entry per country visited.
// photos: add paths to public/assets/travels/<country-id>/
export const travels = [
  {
    id: 'sri-lanka',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    coverPhoto: `${base}/assets/travels/sri-lanka/cover.jpg`,
    timeline: 'Born & raised · Feb 1993 – Aug 2023',
    bio: 'Home. Where everything started — the island that shaped who I am.',
    blog: '',
    photos: [],
  },
  {
    id: 'singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    coverPhoto: `${base}/assets/travels/singapore/cover.jpg`,
    timeline: 'Aug 2020 – Jul 2023',
    bio: 'Worked remotely for KooBits while experiencing one of the most efficient cities in the world.',
    blog: '',
    photos: [],
  },
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    coverPhoto: `${base}/assets/travels/usa/cover.jpg`,
    timeline: 'Aug 2023 – Present',
    bio: "Moved to Texas for my Master's at Texas Tech, then joined CVS Health in Richardson, TX.",
    blog: '',
    photos: [],
  },
]
