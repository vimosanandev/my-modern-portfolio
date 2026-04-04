const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// Add a new entry per country visited.
// photos: add paths to public/assets/travels/<country-id>/
export const travels = [
  {
    id: 'sri-lanka',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    coverPhoto: `${base}/assets/travels/sri-lanka/cover.png`,
    timeline: 'Born & raised · Oct 1993',
    bio: 'Home. Where everything started — the island that shaped who I am.',
    blog: '',
    photos: [],
  },
  {
    id: 'india',
    country: 'India',
    flag: '🇮🇳',
    coverPhoto: `${base}/assets/travels/india/cover.png`,
    timeline: 'Dec 2019',
    bio: 'A neighboring giant rich in culture, history, and diversity — from bustling cities to ancient temples, India felt both familiar and entirely new, offering a deeper appreciation of our shared roots and unique differences.',
    blog: '',
    photos: [],
  },
  {
    id: 'singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    coverPhoto: `${base}/assets/travels/singapore/cover.png`,
    timeline: 'Jan 2020',
    bio: 'Worked remotely for KooBits while experiencing one of the most efficient cities in the world.',
    blog: '',
    photos: [`${base}/assets/travels/singapore/2.jpg`],
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    flag: '🇲🇾',
    coverPhoto: `${base}/assets/travels/malaysia/cover.png`,
    timeline: 'Aug 2021',
    bio: 'A melting pot of cultures, Malaysia offered a rich tapestry of experiences — from the bustling streets of Kuala Lumpur to the serene beaches of Langkawi, each moment revealed the country’s unique blend of tradition and modernity.',
    blog: '',
    photos: [],
  },
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    coverPhoto: `${base}/assets/travels/united-states/cover.png`,
    timeline: 'Jul 2023',
    bio: "Moved to Texas for my Master's at Texas Tech, then joined CVS Health in Richardson, TX.",
    blog: '',
    photos: [],
  },
]
