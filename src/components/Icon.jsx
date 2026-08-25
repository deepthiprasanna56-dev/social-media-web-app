// Small hand-drawn SVG icon set (outline style) — no external icon package required.
const paths = {
  home: 'M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9M10 20v-5h4v5',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15 9l-2 6-4 1 2-6 4-1Z',
  heart: 'M12 20.5s-7.5-4.6-9.6-9C.9 8 2 4.8 5.2 4.1c2-.4 3.9.4 5 2.1a5.4 5.4 0 0 1 5-2.1c3.2.7 4.3 3.9 2.8 7.4-2.1 4.4-9.6 9-9.6 9Z',
  heartFill: 'M12 20.5s-7.5-4.6-9.6-9C.9 8 2 4.8 5.2 4.1c2-.4 3.9.4 5 2.1a5.4 5.4 0 0 1 5-2.1c3.2.7 4.3 3.9 2.8 7.4-2.1 4.4-9.6 9-9.6 9Z',
  bell: 'M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9ZM10 18.5a2 2 0 0 0 4 0',
  message: 'M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  plusSquare: 'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM12 8v8M8 12h8',
  user: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4 21c1.2-4.2 4.4-6.5 8-6.5S18.8 16.8 20 21',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V2.5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z',
  search: 'M11 18.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM21 21l-4.3-4.3',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  comment: 'M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  bookmark: 'M6 4h12a1 1 0 0 1 1 1v15l-7-4.5L5 20V5a1 1 0 0 1 1-1Z',
  bookmarkFill: 'M6 4h12a1 1 0 0 1 1 1v15l-7-4.5L5 20V5a1 1 0 0 1 1-1Z',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z',
  plus: 'M12 5v14M5 12h14',
  photo: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 16l5-5 4 4 3-3 6 6',
  close: 'M6 6l12 12M18 6 6 18',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  chevronDown: 'M6 9l6 6 6-6',
  logout: 'M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4M16 17l5-5-5-5M21 12H9',
  moon: 'M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z',
  sun: 'M12 5V3M12 21v-2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  edit: 'M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3ZM13.5 6.5l4 4',
  camera: 'M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  grid: 'M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z',
  check: 'M20 6 9 17l-5-5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  eyeOff: 'M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M6.6 6.7C4.5 8 3 12 3 12s3.5 7 10 7c1.6 0 3-.4 4.2-1M9.9 4.2A10.6 10.6 0 0 1 12 4c6.5 0 10 8 10 8a15.6 15.6 0 0 1-2.4 3.5',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
}

export default function Icon({ name, className = 'w-5 h-5', filled = false, strokeWidth = 1.8 }) {
  const d = paths[name]
  if (!d) return null
  const isFillIcon = filled && (name === 'heart' || name === 'bookmark')
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFillIcon ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
