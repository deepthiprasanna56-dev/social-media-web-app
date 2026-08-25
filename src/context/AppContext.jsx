import { useEffect, useMemo, useState } from 'react'
import {
  currentUser as seedUser,
  initialPosts,
  initialStories,
  initialConversations,
  initialNotifications,
} from '../data/mockData.js'
import { AppContext } from './appContext.js'

export function AppProvider({ children }) {
  // --- auth -----------------------------------------------------------
  const [authenticated, setAuthenticated] = useState(false)
  const [profile, setProfile] = useState(seedUser)

  // --- theme ------------------------------------------------------------
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('verve_theme') || localStorage.getItem('pulse_theme')
      if (saved !== null) return saved === 'dark'
    } catch {
      // fallback
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('verve_theme', dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  // --- privacy / notification settings -----------------------------
  const [settings, setSettings] = useState({
    privateAccount: false,
    pushNotifications: true,
    showActivityStatus: true,
    emailUpdates: false,
  })

  // --- core data ---------------------------------------------------------
  const [posts, setPosts] = useState(initialPosts)
  const [stories, setStories] = useState(initialStories)
  const [conversations, setConversations] = useState(initialConversations)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [savedIds, setSavedIds] = useState([])

  // --- toast -------------------------------------------------------------
  const [toast, setToast] = useState('')
  const notify = (message) => {
    setToast(message)
    window.clearTimeout(notify._t)
    notify._t = window.setTimeout(() => setToast(''), 2400)
  }

  // --- actions ------------------------------------------------------------
  const login = () => { setAuthenticated(true); notify(`Welcome back, ${profile.name.split(' ')[0]}`) }
  const signup = (name, email) => {
    const handle = '@' + (name.toLowerCase().replace(/[^a-z0-9]/g, '') || profile.handle.slice(1))
    setProfile((p) => ({ ...p, name, handle, email }))
    setAuthenticated(true)
    notify('Account created — welcome to Verve')
  }
  const logout = () => { setAuthenticated(false); notify('Signed out') }

  const toggleLike = (postId) => setPosts((current) => current.map((post) => (
    post.id === postId ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post
  )))

  const addComment = (postId, text) => {
    if (!text.trim()) return
    setPosts((current) => current.map((post) => (
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: `c-${Date.now()}`, person: profile, text: text.trim() }] }
        : post
    )))
  }

  const deletePost = (postId) => {
    setPosts((current) => current.filter((post) => post.id !== postId))
    notify('Post deleted')
  }

  const createPost = ({ text, image }) => {
    if (!text.trim() && !image) return
    setPosts((current) => [
      {
        id: `p-${Date.now()}`,
        person: profile,
        time: 'Just now',
        text: text.trim() || '',
        image: image || '',
        likes: 0,
        liked: false,
        comments: [],
      },
      ...current,
    ])
    notify('Your post is live')
  }

  const toggleSave = (postId) => setSavedIds((current) => (
    current.includes(postId) ? current.filter((id) => id !== postId) : [...current, postId]
  ))

  const addStoryItem = ({ image = '', text = '', background = '' }) => {
    const trimmedText = text.trim()
    setStories((current) => {
      const mine = current.find((s) => s.person.id === profile.id)
      const item = { image, text: trimmedText, background, type: trimmedText ? 'text' : 'photo', caption: 'Just now' }
      if (mine) {
        return current.map((s) => (s.person.id === profile.id ? { ...s, items: [...s.items, item] } : s))
      }
      return [{ id: `s-${Date.now()}`, person: profile, viewed: false, items: [item] }, ...current]
    })
    notify('Your story was posted')
  }

  const markStoryViewed = (storyId) => setStories((current) => current.map((s) => (
    s.id === storyId ? { ...s, viewed: true } : s
  )))

  const sendMessage = (conversationId, text) => {
    if (!text.trim()) return
    setConversations((current) => current.map((c) => (
      c.id === conversationId
        ? { ...c, messages: [...c.messages, { id: Date.now(), from: 'me', text: text.trim(), time: 'Just now' }] }
        : c
    )))
  }

  const markAllNotificationsRead = () => setNotifications((current) => current.map((n) => ({ ...n, read: true })))
  const markNotificationRead = (id) => setNotifications((current) => current.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const updateProfile = (patch) => { setProfile((p) => ({ ...p, ...patch })); notify('Profile updated') }
  const updateSettings = (patch) => setSettings((s) => ({ ...s, ...patch }))

  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])
  const unreadMessages = useMemo(() => conversations.filter((c) => c.messages.at(-1)?.from === 'them').length, [conversations])

  const value = {
    authenticated, login, signup, logout,
    profile, updateProfile,
    dark, setDark,
    settings, updateSettings,
    posts, toggleLike, addComment, createPost, deletePost,
    stories, addStoryItem, markStoryViewed,
    conversations, sendMessage,
    notifications, markAllNotificationsRead, markNotificationRead, unreadNotifications,
    unreadMessages,
    savedIds, toggleSave,
    toast, notify,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
