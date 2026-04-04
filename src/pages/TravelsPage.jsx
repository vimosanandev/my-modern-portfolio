import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { travels } from '../data/travels'

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
        zIndex: 300,
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

function CountryDetail({ entry, onBack }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
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
      </div>

      {/* Cover */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/6',
          borderRadius: '1rem',
          overflow: 'hidden',
          marginBottom: '1.75rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(34,211,238,0.15)',
        }}
      >
        {entry.coverPhoto && (
          <img
            src={entry.coverPhoto}
            alt={entry.country}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}
        >
          <span style={{ fontSize: '2rem' }}>{entry.flag}</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>
            {entry.country}
          </h2>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#22d3ee', fontFamily: 'var(--font-mono)' }}>
          {entry.timeline}
        </div>
      </div>

      {/* Bio */}
      {entry.bio && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#22d3ee',
              marginBottom: '0.6rem',
            }}
          >
            About this place
          </div>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {entry.bio}
          </p>
        </div>
      )}

      {/* Blog */}
      {entry.blog && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#a855f7',
              marginBottom: '0.6rem',
            }}
          >
            My story
          </div>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {entry.blog}
          </p>
        </div>
      )}

      {/* Photos */}
      {entry.photos.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ec4899',
              marginBottom: '1rem',
            }}
          >
            Photos · {entry.photos.length}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {entry.photos.map((src, i) => (
              <motion.div
                key={i}
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
                <img
                  src={src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={entry.photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => i - 1)}
            onNext={() => setLightboxIndex((i) => i + 1)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TravelsPage() {
  const navigate = useNavigate()
  const [activeEntry, setActiveEntry] = useState(null)

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
                color: '#22d3ee',
                marginBottom: '0.3rem',
              }}
            >
              Personal Space
            </p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              ✈️ Travels
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
        <AnimatePresence mode="wait">
          {activeEntry ? (
            <CountryDetail key="detail" entry={activeEntry} onBack={() => setActiveEntry(null)} />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem',
              }}
            >
              {travels.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  onClick={() => setActiveEntry(entry)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(34,211,238,0.15)',
                    background: 'rgba(255,255,255,0.03)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.15)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Cover */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {entry.coverPhoto && (
                      <img
                        src={entry.coverPhoto}
                        alt={entry.country}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '1rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{entry.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>
                        {entry.country}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: '#22d3ee',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {entry.timeline}
                    </div>
                    {entry.bio && (
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'rgba(255,255,255,0.45)',
                          margin: 0,
                          lineHeight: 1.5,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {entry.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
