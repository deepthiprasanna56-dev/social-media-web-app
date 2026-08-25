import { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

function EditProfileModal({ onClose }) {
  const { profile, updateProfile, notify } = useApp()
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio)
  const [avatar, setAvatar] = useState(profile.avatar)
  const [error, setError] = useState('')

  const pickAvatar = (e) => {
    const file = e.target.files?.[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  const save = () => {
    if (!name.trim()) { setError('Name cannot be empty.'); return }
    updateProfile({ name: name.trim(), bio: bio.trim(), avatar })
    notify('Profile updated successfully')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 dark:bg-black/70 backdrop-blur-sm grid place-items-center p-4 sm:p-5 animate-fade-in" onClick={onClose}>
      <section className="w-full max-w-[440px] bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl p-6 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink dark:text-dark-ink">Edit profile</h2>
          <button onClick={onClose} className="text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"><Icon name="close" className="w-5 h-5" /></button>
        </div>
        <div className="flex flex-col items-center gap-3 mb-5">
          <Avatar person={{ ...profile, avatar }} size="xl" />
          <label className="text-orange hover:text-orange/80 text-[12.5px] font-semibold cursor-pointer transition-colors">
            Change photo
            <input type="file" accept="image/*" className="hidden" onChange={pickAvatar} />
          </label>
        </div>
        <div className="grid gap-3.5">
          <label className="grid gap-1.5 text-[12.5px] font-semibold text-ink dark:text-dark-ink">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} className="border border-line dark:border-dark-line rounded-xl px-3.5 py-2.5 text-[13px] bg-canvas dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink transition-colors" />
          </label>
          <label className="grid gap-1.5 text-[12.5px] font-semibold text-ink dark:text-dark-ink">
            Bio
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="border border-line dark:border-dark-line rounded-xl px-3.5 py-2.5 text-[13px] bg-canvas dark:bg-dark-canvas outline-none focus:border-orange resize-none text-ink dark:text-dark-ink transition-colors" />
          </label>
          {error && <p className="text-orange text-[12px] font-medium">{error}</p>}
          <button onClick={save} className="bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas hover:opacity-90 active:scale-95 transition-all rounded-xl py-2.5 text-[13px] font-semibold mt-1">Save changes</button>
        </div>
      </section>
    </div>
  )
}

export default function ProfilePage() {
  const { profile, posts, savedIds } = useApp()
  const [tab, setTab] = useState('posts')
  const [editing, setEditing] = useState(false)

  const myPosts = posts.filter((p) => p.person.id === profile.id)
  const savedPosts = posts.filter((p) => savedIds.includes(p.id))
  const likedPosts = posts.filter((p) => p.liked)
  const shown = tab === 'posts' ? myPosts : tab === 'saved' ? savedPosts : likedPosts

  return (
    <div className="max-w-[820px] mx-auto pb-24 md:pb-16 animate-fade-in">
      <div className="h-40 sm:h-56 w-full overflow-hidden bg-canvas dark:bg-dark-canvas">
        <img src={profile.cover} alt="Cover" className="w-full h-full object-cover" />
      </div>
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
          <Avatar person={profile} size="xl" className="ring-4 ring-paper dark:ring-dark-paper shadow-md" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="font-display font-semibold text-[22px] sm:text-[24px] text-ink dark:text-dark-ink">{profile.name}</h1>
              <p className="text-muted dark:text-dark-muted text-[12.5px]">{profile.handle}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 border border-line dark:border-dark-line rounded-xl px-4 py-2 text-[12.5px] font-semibold text-ink dark:text-dark-ink hover:bg-paper dark:hover:bg-dark-paper hover:shadow-sm active:scale-95 transition-all w-max"
            >
              <Icon name="edit" className="w-3.5 h-3.5 text-orange" /> Edit profile
            </button>
          </div>
        </div>

        <p className="text-[13.5px] text-ink dark:text-dark-ink mt-4 max-w-lg leading-relaxed">{profile.bio}</p>

        <div className="flex gap-6 sm:gap-8 mt-5 text-[13.5px]">
          <span><strong className="text-ink dark:text-dark-ink font-semibold">{myPosts.length}</strong> <span className="text-muted">posts</span></span>
          <span><strong className="text-ink dark:text-dark-ink font-semibold">{profile.followers.toLocaleString()}</strong> <span className="text-muted">followers</span></span>
          <span><strong className="text-ink dark:text-dark-ink font-semibold">{profile.following.toLocaleString()}</strong> <span className="text-muted">following</span></span>
        </div>

        <div className="flex gap-6 sm:gap-8 mt-7 border-b border-line dark:border-dark-line">
          {[['posts', 'Posts'], ['saved', 'Saved'], ['liked', 'Liked']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`pb-3 text-[13px] font-semibold border-b-2 -mb-px transition-colors ${tab === id ? 'border-orange text-orange font-bold' : 'border-transparent text-muted hover:text-ink dark:hover:text-dark-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="text-center text-muted text-[13.5px] py-16 px-4">
            <p>{tab === 'posts' ? 'Nothing posted yet — share your first moment.' : tab === 'saved' ? 'Posts you save will show up here.' : 'Posts you like will show up here.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 py-6">
            {shown.map((post) => (
              <div key={post.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-canvas dark:bg-dark-canvas">
                {post.image ? (
                  <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full p-4 text-[12px] text-ink dark:text-dark-ink flex items-center justify-center text-center">{post.text}</div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5 text-white text-[13px] font-semibold"><Icon name="heart" filled className="w-4 h-4 text-orange" />{post.likes}</span>
                  <span className="flex items-center gap-1.5 text-white text-[13px] font-semibold"><Icon name="comment" className="w-4 h-4" />{post.comments.length}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editing && <EditProfileModal onClose={() => setEditing(false)} />}
    </div>
  )
}
