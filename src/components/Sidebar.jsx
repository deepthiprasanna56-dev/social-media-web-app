import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'
import { useApp } from '../context/useApp.js'

const navItems = [
  ['home', 'Home', 'home'],
  ['explore', 'Explore', 'compass'],
  ['notifications', 'Notifications', 'bell'],
  ['messages', 'Messages', 'message'],
  ['profile', 'Profile', 'user'],
]

export default function Sidebar({ active, onNavigate, onCompose }) {
  const { profile, unreadNotifications, unreadMessages } = useApp()

  return (
    <aside className="hidden md:flex md:w-[84px] lg:w-[260px] flex-none sticky top-0 h-screen z-30 flex-col justify-between border-r border-line dark:border-dark-line bg-paper dark:bg-dark-paper px-3 lg:px-5 py-6 overflow-y-auto">
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 font-display font-bold text-[26px] tracking-tight mb-6 lg:mb-8 px-2 justify-center lg:justify-start text-ink dark:text-dark-ink w-full text-left"
          title="Verve Home"
          aria-label="Verve Home"
        >
          <span className="grid place-items-center w-[29px] h-[29px] rounded-[9px_9px_9px_2px] bg-orange text-white text-[22px] -rotate-6 flex-none">v</span>
          <span className="hidden lg:inline">verve</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="w-full flex items-center gap-2.5 border border-line dark:border-dark-line rounded-xl p-2.5 lg:p-3 mb-5 text-left justify-center lg:justify-start hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"
          title={profile.name}
          aria-label="Your Profile"
        >
          <Avatar person={profile} size="sm" />
          <div className="hidden lg:flex flex-col min-w-0">
            <strong className="text-[13px] truncate text-ink dark:text-dark-ink">{profile.name}</strong>
            <span className="text-[11px] text-muted dark:text-dark-muted truncate">{profile.handle}</span>
          </div>
        </button>

        <nav className="grid gap-1.5">
          {navItems.map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={label}
              aria-label={label}
              className={`w-full flex items-center gap-3.5 rounded-[10px] px-3.5 py-3 text-[14px] justify-center lg:justify-start relative transition-colors
                ${active === id
                  ? 'bg-lime-soft dark:bg-dark-line font-semibold text-ink dark:text-dark-ink'
                  : 'text-muted dark:text-dark-muted hover:bg-canvas dark:hover:bg-dark-canvas hover:text-ink dark:hover:text-dark-ink'}`}
            >
              <Icon name={icon} className="w-5 h-5 flex-none" />
              <span className="hidden lg:inline">{label}</span>
              {id === 'notifications' && unreadNotifications > 0 && (
                <b className="lg:ml-auto grid place-items-center bg-orange text-white rounded-full min-w-5 h-5 text-[10px] font-bold absolute lg:static -top-1 -right-1 lg:top-auto lg:right-auto px-1">{unreadNotifications}</b>
              )}
              {id === 'messages' && unreadMessages > 0 && (
                <b className="lg:ml-auto grid place-items-center bg-orange text-white rounded-full min-w-5 h-5 text-[10px] font-bold absolute lg:static -top-1 -right-1 lg:top-auto lg:right-auto px-1">{unreadMessages}</b>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-4 lg:pt-6 grid gap-2">
        <button
          onClick={onCompose}
          title="New post"
          aria-label="New post"
          className="w-full flex items-center gap-3 justify-center rounded-[10px] bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas py-3 font-semibold text-[13px]"
        >
          <Icon name="plus" className="w-4 h-4 flex-none" />
          <span className="hidden lg:inline">New post</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          title="Settings"
          aria-label="Settings"
          className={`w-full flex items-center gap-3.5 rounded-[10px] px-3.5 py-3 text-[14px] justify-center lg:justify-start transition-colors
            ${active === 'settings' ? 'bg-lime-soft dark:bg-dark-line font-semibold text-ink dark:text-dark-ink' : 'text-muted dark:text-dark-muted hover:bg-canvas dark:hover:bg-dark-canvas hover:text-ink dark:hover:text-dark-ink'}`}
        >
          <Icon name="settings" className="w-5 h-5 flex-none" />
          <span className="hidden lg:inline">Settings</span>
        </button>
        <small className="hidden lg:block text-[#b7bcb4] dark:text-dark-muted mt-2 px-3.5 text-[9px] tracking-[1.5px]">VERVE / 2.4.0</small>
      </div>
    </aside>
  )
}
