const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// Add new albums here when you add folders to public/assets/photos/
export const albums = [
  {
    id: 'at-handerson',
    name: 'At Henderson',
    cover: `${base}/assets/photos/at-handerson/GPTempDownload.jpg`,
    photos: [
      `${base}/assets/photos/at-handerson/GPTempDownload.jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(2).jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(5).jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(8).jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(9).jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(10).jpg`,
      `${base}/assets/photos/at-handerson/GPTempDownload(15).jpg`,
    ],
  },
]
