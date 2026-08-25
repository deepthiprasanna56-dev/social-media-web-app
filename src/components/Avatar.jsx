const sizes = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

export default function Avatar({ person, size = 'md', ring = false, className = '' }) {
  return (
    <img
      src={person.avatar}
      alt={`${person.name} avatar`}
      className={`${sizes[size] || sizes.md} rounded-full object-cover flex-none ${ring ? 'ring-2 ring-paper dark:ring-dark-paper' : ''} ${className}`}
    />
  )
}
