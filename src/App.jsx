import { useState } from 'react'
import { useApp } from './context/useApp.js'
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import MessagesPage from './pages/MessagesPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import Topbar from './components/Topbar.jsx'
import StoryViewer from './components/StoryViewer.jsx'
import CreatePostModal from './components/CreatePostModal.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  const { authenticated } = useApp()
  const [active, setActive] = useState('home')
  const [search, setSearch] = useState('')
  const [openStoryId, setOpenStoryId] = useState(null)
  const [composer, setComposer] = useState(null) // 'post' | 'story' | null

  if (!authenticated) return <AuthPage />

  return (
    <div className="min-h-screen flex bg-canvas dark:bg-dark-canvas text-ink dark:text-dark-ink">
      <Sidebar active={active} onNavigate={setActive} onCompose={() => setComposer('post')} />

      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Topbar onNavigate={setActive} search={search} onSearch={setSearch} />
        <main className="flex-1">
          {active === 'home' && (
            <HomePage
              onOpenStory={setOpenStoryId}
              onAddStory={() => setComposer('story')}
              onCompose={() => setComposer('post')}
            />
          )}
          {active === 'explore' && <ExplorePage />}
          {active === 'messages' && <MessagesPage />}
          {active === 'notifications' && <NotificationsPage />}
          {active === 'profile' && <ProfilePage />}
          {active === 'settings' && <SettingsPage />}
        </main>
      </div>

      <MobileNav active={active} onNavigate={setActive} onCompose={() => setComposer('post')} />

      {openStoryId && (
        <StoryViewer key={openStoryId} storyId={openStoryId} onClose={() => setOpenStoryId(null)} onChangeStory={setOpenStoryId} />
      )}
      {composer && <CreatePostModal mode={composer} onClose={() => setComposer(null)} />}
      <Toast />
    </div>
  )
}
