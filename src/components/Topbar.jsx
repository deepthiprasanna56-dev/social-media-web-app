import { useState } from 'react'
import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'
import { useApp } from '../context/useApp.js'
import { people } from '../data/mockData.js'

export default function Topbar({ onNavigate, search, onSearch }) {
  const { profile, dark, setDark, logout, unreadNotifications } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const results = search.trim()
    ? people.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.handle.includes(search.toLowerCase()))
    : []

  return (
    <header className="sticky top-0 z-30 h-[74px] bg-paper/95 dark:bg-dark-paper/95 backdrop-blur-md border-b border-line dark:border-dark-line px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 transition-colors">
      <button
        onClick={() => onNavigate('home')}
        className="md:hidden flex items-center gap-2 font-display font-bold text-lg text-ink dark:text-dark-ink"
      >
        <span className="grid place-items-center w-7 h-7 rounded-[8px_8px_8px_2px] bg-orange text-white text-sm -rotate-6">v</span>
        <span>verve</span>
      </button>

      <div className="relative hidden sm:block w-[260px] md:w-[300px] flex-none">
        <label className="flex items-center gap-2.5 border border-line dark:border-dark-line rounded-xl px-3.5 py-2 text-muted dark:text-dark-muted focus-within:border-orange dark:focus-within:border-orange bg-canvas/50 dark:bg-dark-canvas/50 transition-colors">
          <Icon name="search" className="w-4 h-4 text-muted" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search Verve"
            className="w-full border-0 outline-none bg-transparent text-[12.5px] text-ink dark:text-dark-ink placeholder:text-muted"
          />
          {search && (
            <button onClick={() => onSearch('')} className="text-muted hover:text-ink">
              <Icon name="close" className="w-3.5 h-3.5" />
            </button>
          )}
        </label>
        {results.length > 0 && (
          <div className="absolute top-[110%] left-0 w-full bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-xl shadow-xl overflow-hidden animate-scale-in z-40">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => { onSearch(''); onNavigate('explore') }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-canvas dark:hover:bg-dark-canvas text-left transition-colors"
              >
                <Avatar person={p} size="xs" />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold truncate text-ink dark:text-dark-ink">{p.name}</p>
                  <p className="text-[11px] text-muted truncate">{p.handle}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
        <button
          onClick={() => setDark((d) => !d)}
          className="text-ink dark:text-dark-ink p-2 rounded-xl hover:bg-canvas dark:hover:bg-dark-canvas active:scale-95 transition-all"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Icon name={dark ? 'sun' : 'moon'} className="w-5 h-5 text-orange" />
        </button>

        <button
          onClick={() => onNavigate('notifications')}
          className="relative text-ink dark:text-dark-ink p-2 rounded-xl hover:bg-canvas dark:hover:bg-dark-canvas active:scale-95 transition-all"
          aria-label="Notifications"
          title="Notifications"
        >
          <Icon name="bell" className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-0.5 rounded-full hover:ring-2 hover:ring-orange/40 transition-all"
            aria-label="Open profile menu"
          >
            <Avatar person={profile} size="sm" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-[120%] z-40 w-48 bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl shadow-xl py-1.5 overflow-hidden animate-scale-in">
                <div className="px-4 py-2.5 border-b border-line dark:border-dark-line">
                  <p className="text-[13px] font-semibold text-ink dark:text-dark-ink truncate">{profile.name}</p>
                  <p className="text-[11px] text-muted truncate">{profile.handle}</p>
                </div>
                <button onClick={() => { onNavigate('profile'); setMenuOpen(false) }} className="w-full text-left px-4 py-2.5 text-[12.5px] text-ink dark:text-dark-ink hover:bg-canvas dark:hover:bg-dark-canvas flex items-center gap-2.5 transition-colors">
                  <Icon name="user" className="w-4 h-4 text-muted" /> Profile
                </button>
                <button onClick={() => { onNavigate('settings'); setMenuOpen(false) }} className="w-full text-left px-4 py-2.5 text-[12.5px] text-ink dark:text-dark-ink hover:bg-canvas dark:hover:bg-dark-canvas flex items-center gap-2.5 transition-colors">
                  <Icon name="settings" className="w-4 h-4 text-muted" /> Settings
                </button>
                <button onClick={() => { logout(); setMenuOpen(false) }} className="w-full text-left px-4 py-2.5 text-[12.5px] text-orange hover:bg-canvas dark:hover:bg-dark-canvas flex items-center gap-2.5 transition-colors border-t border-line dark:border-dark-line">
                  <Icon name="logout" className="w-4 h-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
