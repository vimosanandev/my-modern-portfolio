import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { albums } from '../data/photos'

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          fontSize: '1.5rem',
          lineHeight: 1,
          padding: '0.25rem',
        }}
      >
        ✕
      </button>

      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          style={{
            position: 'absolute',
            left: '1rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </button>
      )}

      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={photos[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '88vh',
          objectFit: 'contain',
          borderRadius: '0.5rem',
        }}
      />

      {index < photos.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          style={{
            position: 'absolute',
            right: '1rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ›
        </button>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {index + 1} / {photos.length}
      </div>
    </motion.div>
  )
}

function AlbumView({ album, onBack }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.5rem',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            padding: '0.4rem 0.85rem',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          ← Back
        </motion.button>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{album.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            {album.photos.length} photos
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.5rem',
        }}
      >
        {album.photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setLightboxIndex(i)}
            style={{
              aspectRatio: '1',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={album.photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => i - 1)}
            onNext={() => setLightboxIndex((i) => i + 1)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PhotosPage() {
  const navigate = useNavigate()
  const [activeAlbum, setActiveAlbum] = useState(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-dark-base)',
        padding: '2rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ec4899',
                marginBottom: '0.3rem',
              }}
            >
              Personal Space
            </p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              📷 Photos
            </h1>
          </div>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.5rem',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: '0.4rem 0.9rem',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← Back to Portfolio
          </motion.button>
        </div>

        {/* Content */}
        {activeAlbum ? (
          <AlbumView album={activeAlbum} onBack={() => setActiveAlbum(null)} />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {albums.map((album, i) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setActiveAlbum(album)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(236,72,153,0.2)',
                  background: 'rgba(255,255,255,0.03)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(236,72,153,0.5)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(236,72,153,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(236,72,153,0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src={album.cover}
                    alt={album.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
                    {album.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.35)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {album.photos.length} photos
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
