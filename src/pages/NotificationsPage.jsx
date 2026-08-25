import { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

const iconFor = { like: 'heart', comment: 'comment', follow: 'user' }
const colorFor = { like: 'text-orange', comment: 'text-sky', follow: 'text-ink dark:text-dark-ink' }

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead, markNotificationRead, notify } = useApp()
  const [filter, setFilter] = useState('all')

  const displayed = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  const handleMarkAll = () => {
    markAllNotificationsRead()
    notify('All notifications marked as read')
  }

  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 md:px-8 pt-7 sm:pt-9 pb-24 md:pb-16 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-2">Activity</p>
          <h1 className="font-display font-semibold text-[26px] tracking-tight text-ink dark:text-dark-ink">Notifications</h1>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAll}
            className="text-[12px] font-semibold text-ink dark:text-dark-ink hover:text-orange dark:hover:text-orange border border-line dark:border-dark-line rounded-xl px-3.5 py-2 hover:bg-paper dark:hover:bg-dark-paper active:scale-95 transition-all self-start sm:self-auto"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {[['all', 'All'], ['unread', 'Unread']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${filter === key ? 'bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas' : 'text-muted dark:text-dark-muted hover:bg-paper dark:hover:bg-dark-paper'}`}
          >
            {label} {key === 'unread' && notifications.filter((n) => !n.read).length > 0 && `(${notifications.filter((n) => !n.read).length})`}
          </button>
        ))}
      </div>

      <div className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper overflow-hidden shadow-sm">
        {displayed.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-muted text-[13px]">{filter === 'unread' ? 'No unread notifications.' : "You're all caught up."}</p>
          </div>
        ) : (
          displayed.map((n) => (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`w-full flex items-center gap-3.5 px-4 sm:px-5 py-4 text-left border-b border-line dark:border-dark-line last:border-0 transition-colors ${!n.read ? 'bg-lime-soft/40 dark:bg-dark-line/30 hover:bg-lime-soft/60' : 'hover:bg-canvas/50 dark:hover:bg-dark-canvas/50'}`}
            >
              <div className="relative flex-none">
                <Avatar person={n.person} size="sm" />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-paper dark:bg-dark-paper border border-line dark:border-dark-line grid place-items-center ${colorFor[n.type]}`}>
                  <Icon name={iconFor[n.type]} filled={n.type === 'like'} className="w-2.5 h-2.5" />
                </span>
              </div>
              <p className="text-[13px] text-ink dark:text-dark-ink flex-1 min-w-0 pr-2">
                <strong className="font-semibold">{n.person.name}</strong> <span className="text-ink/80 dark:text-dark-ink/80">{n.text}</span>
              </p>
              <span className="text-[11px] text-muted flex-none">{n.time}</span>
              {!n.read && <span className="w-2 h-2 rounded-full bg-orange flex-none ml-2" />}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
