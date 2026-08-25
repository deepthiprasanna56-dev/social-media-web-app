import Icon from './Icon.jsx'
import { useApp } from '../context/useApp.js'

const items = [
  ['home', 'home'],
  ['explore', 'compass'],
  ['messages', 'message'],
  ['notifications', 'bell'],
  ['profile', 'user'],
]

export default function MobileNav({ active, onNavigate, onCompose }) {
  const { unreadNotifications, unreadMessages } = useApp()
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-paper/95 dark:bg-dark-paper/95 backdrop-blur-md border-t border-line dark:border-dark-line flex items-center justify-around py-2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg">
      {items.map(([id, icon]) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`relative p-2.5 rounded-xl transition-all duration-200 active:scale-90 ${active === id ? 'text-orange bg-orange-soft/40 dark:bg-dark-line font-bold' : 'text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink'}`}
          aria-label={id}
        >
          <Icon name={icon} className="w-5 h-5" />
          {id === 'notifications' && unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-orange text-white text-[9px] font-bold flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
          {id === 'messages' && unreadMessages > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-orange text-white text-[9px] font-bold flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </button>
      ))}
      <button
        onClick={onCompose}
        className="p-2.5 rounded-xl text-white bg-ink dark:bg-dark-ink hover:opacity-90 active:scale-90 transition-all shadow-sm"
        aria-label="Create post"
      >
        <Icon name="plus" className="w-5 h-5" />
      </button>
    </nav>
  )
}
