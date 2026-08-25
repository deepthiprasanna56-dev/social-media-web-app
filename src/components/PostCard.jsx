import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { useApp } from '../context/useApp.js'

export default function PostCard({ post }) {
  const { profile, toggleLike, addComment, deletePost, savedIds, toggleSave, notify } = useApp()
  const [draft, setDraft] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHeartBurst, setShowHeartBurst] = useState(false)
  const isMine = post.person.id === profile.id
  const saved = savedIds.includes(post.id)

  const handleImageDoubleClick = () => {
    if (!post.liked) {
      toggleLike(post.id)
    }
    setShowHeartBurst(true)
    setTimeout(() => setShowHeartBurst(false), 800)
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
    notify('Post link copied to clipboard')
  }

  const handleSave = () => {
    toggleSave(post.id)
    notify(saved ? 'Removed from saved' : 'Post saved to bookmarks')
  }

  const submitComment = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    addComment(post.id, draft)
    setDraft('')
    setShowComments(true)
    notify('Comment posted')
  }

  return (
    <article className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper p-4 sm:p-5 mb-5 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(65,74,56,0.08)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3">
        <Avatar person={post.person} size="md" />
        <div className="min-w-0 flex-1">
          <strong className="block text-[13.5px] font-semibold text-ink dark:text-dark-ink truncate">{post.person.name}</strong>
          <span className="text-[11.5px] text-muted dark:text-dark-muted">{post.person.handle} · {post.time}</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-muted dark:text-dark-muted p-1.5 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"
            aria-label="More options"
          >
            <Icon name="more" className="w-5 h-5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-[110%] z-20 w-44 bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-xl shadow-xl py-1.5 text-[12.5px] overflow-hidden animate-scale-in">
                <button
                  onClick={() => { handleSave(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-canvas dark:hover:bg-dark-canvas text-ink dark:text-dark-ink transition-colors"
                >
                  <Icon name="bookmark" className="w-4 h-4" />
                  {saved ? 'Remove from saved' : 'Save post'}
                </button>
                {isMine && (
                  <button
                    onClick={() => { deletePost(post.id); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-canvas dark:hover:bg-dark-canvas text-orange transition-colors"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                    Delete post
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {post.text && (
        <p className="text-[13.5px] sm:text-[14px] leading-relaxed my-3.5 text-ink dark:text-dark-ink break-words">
          {post.text}
        </p>
      )}

      {post.image && (
        <div className="relative overflow-hidden rounded-xl bg-canvas dark:bg-dark-canvas select-none cursor-pointer group" onDoubleClick={handleImageDoubleClick}>
          <img
            src={post.image}
            alt="Post visual"
            className="w-full max-h-[460px] object-cover rounded-xl block transition-transform duration-500 group-hover:scale-[1.01]"
          />
          {showHeartBurst && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Icon name="heart" filled className="w-20 h-20 text-white fill-orange drop-shadow-lg animate-heart-burst" />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between py-3 border-b border-[#edf0e9] dark:border-dark-line mt-1">
        <div className="flex items-center gap-5">
          <button
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-1.5 text-[12.5px] font-medium transition-colors ${post.liked ? 'text-orange' : 'text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink'}`}
            aria-label="Like post"
          >
            <Icon name="heart" filled={post.liked} className={`w-5 h-5 transition-transform ${post.liked ? 'animate-pop' : ''}`} />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments((v) => !v)}
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink transition-colors"
            aria-label="Toggle comments"
          >
            <Icon name="comment" className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
          <button
            onClick={handleShare}
            className="text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"
            aria-label="Share post"
          >
            <Icon name="send" className="w-[18px] h-[18px]" />
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors ${saved ? 'text-ink dark:text-dark-ink' : 'text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink'}`}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark post'}
        >
          <Icon name="bookmark" filled={saved} className="w-5 h-5" />
        </button>
      </div>

      {showComments && (
        <div className="mt-3 grid gap-2 animate-fade-in">
          {post.comments.length === 0 ? (
            <p className="text-[12px] text-muted dark:text-dark-muted py-1 italic">No comments yet. Be the first to comment!</p>
          ) : (
            post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2 text-[12.5px] text-muted dark:text-dark-muted leading-relaxed">
                <Avatar person={c.person} size="xs" />
                <div className="flex-1 min-w-0 bg-canvas/60 dark:bg-dark-canvas/60 rounded-xl px-3 py-1.5">
                  <strong className="text-ink dark:text-dark-ink mr-1.5">{c.person.name}</strong>
                  <span className="text-ink/80 dark:text-dark-ink/80">{c.text}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <form onSubmit={submitComment} className="flex items-center gap-2.5 pt-3">
        <Avatar person={profile} size="xs" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 min-w-0 border-0 outline-none bg-transparent text-[12.5px] text-ink dark:text-dark-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="text-orange text-[12.5px] font-bold disabled:opacity-40 hover:opacity-90 transition-opacity px-2 py-1"
        >
          Post
        </button>
      </form>
    </article>
  )
}
