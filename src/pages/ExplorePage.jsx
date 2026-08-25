import { useState } from 'react'
import { categoriesData, people } from '../data/mockData.js'
import Avatar from '../components/Avatar.jsx'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

function PersonProfileModal({ person, isFollowing, onFollow, onClose }) {
  const { posts } = useApp()
  const personPosts = posts.filter((post) => post.person.id === person.id)

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 dark:bg-black/70 backdrop-blur-sm grid place-items-center p-4 sm:p-5 animate-fade-in" onClick={onClose}>
      <section className="w-full max-w-[440px] bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink dark:text-dark-ink">Profile</h2>
          <button onClick={onClose} aria-label="Close profile" className="text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <Avatar person={person} size="xl" />
          <h3 className="font-display font-semibold text-[20px] mt-3 text-ink dark:text-dark-ink">{person.name}</h3>
          <p className="text-[12px] text-muted dark:text-dark-muted mt-0.5">{person.handle}</p>
          <p className="text-[13px] leading-relaxed text-ink dark:text-dark-ink mt-3 max-w-sm">{person.bio}</p>
          <div className="flex gap-8 mt-4 text-[13px]">
            <span><strong className="text-ink dark:text-dark-ink">{person.id === 'u1' ? '248' : person.id === 'u2' ? '126' : '89'}</strong> <span className="text-muted">posts</span></span>
            <span><strong className="text-ink dark:text-dark-ink">{person.id === 'u1' ? '2.4k' : person.id === 'u2' ? '984' : '1.7k'}</strong> <span className="text-muted">followers</span></span>
          </div>
          <div className="w-full mt-6 text-left">
            <h4 className="font-display font-semibold text-[13px] text-ink dark:text-dark-ink mb-3">Posts</h4>
            {personPosts.length === 0 ? (
              <p className="text-center text-[12px] text-muted py-6">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {personPosts.map((post) => (
                  <div key={post.id} className="aspect-square overflow-hidden rounded-lg bg-canvas dark:bg-dark-canvas">
                    {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <p className="p-2 text-[10px] leading-snug text-ink dark:text-dark-ink">{post.text}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onFollow}
            className={`mt-6 w-full rounded-xl py-2.5 text-[12.5px] font-semibold transition-all active:scale-95 ${isFollowing ? 'border border-line dark:border-dark-line text-ink dark:text-dark-ink hover:bg-canvas dark:hover:bg-dark-canvas' : 'bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas hover:opacity-90'}`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </section>
    </div>
  )
}

function PhotoDetailModal({ photo, isFollowing, onFollow, onClose, onSelectTag }) {
  const { profile, notify } = useApp()
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(photo.likes)
  const [saved, setSaved] = useState(false)
  const [comments, setComments] = useState([
    { id: 'c-init-1', person: people[0], text: 'The composition here is so clean!' },
    { id: 'c-init-2', person: people[3], text: 'Incredible lighting and palette.' }
  ])
  const [draft, setDraft] = useState('')

  const toggleLike = () => {
    if (liked) {
      setLiked(false)
      setLikesCount((c) => c - 1)
    } else {
      setLiked(true)
      setLikesCount((c) => c + 1)
    }
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
    notify('Photo link copied to clipboard')
  }

  const handleSave = () => {
    setSaved((s) => !s)
    notify(!saved ? 'Saved to bookmarks' : 'Removed from bookmarks')
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    setComments((current) => [...current, { id: `c-${Date.now()}`, person: profile, text: draft.trim() }])
    setDraft('')
    notify('Comment added')
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 dark:bg-black/80 backdrop-blur-md grid place-items-center p-3 sm:p-6 animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-[960px] max-h-[92vh] bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-[1fr_360px] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo view left */}
        <div className="relative bg-ink flex items-center justify-center min-h-[300px] max-h-[50vh] md:max-h-[85vh] overflow-hidden group">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[85vh]"
            onDoubleClick={toggleLike}
          />
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full"
            aria-label="Close"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Info panel right */}
        <div className="flex flex-col h-full max-h-[48vh] md:max-h-[85vh] bg-paper dark:bg-dark-paper">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-line dark:border-dark-line flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar person={photo.author} size="md" />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-ink dark:text-dark-ink truncate">{photo.author.name}</p>
                <p className="text-[11.5px] text-muted dark:text-dark-muted truncate">{photo.author.handle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onFollow}
                className={`text-[11.5px] font-semibold rounded-lg px-3 py-1.5 transition-all ${isFollowing ? 'border border-line dark:border-dark-line text-ink dark:text-dark-ink' : 'bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas'}`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={onClose}
                className="hidden md:flex text-muted hover:text-ink dark:hover:text-dark-ink p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"
                aria-label="Close modal"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description & metadata */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
            <div>
              <h3 className="font-display font-semibold text-[16px] text-ink dark:text-dark-ink">{photo.title}</h3>
              <p className="text-[13px] text-ink/80 dark:text-dark-ink/80 mt-1.5 leading-relaxed">{photo.caption}</p>
            </div>

            {(photo.meta || photo.location) && (
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-muted dark:text-dark-muted">
                {photo.location && (
                  <span className="bg-canvas dark:bg-dark-canvas border border-line dark:border-dark-line rounded-md px-2 py-1">
                    📍 {photo.location}
                  </span>
                )}
                {photo.meta && (
                  <span className="bg-canvas dark:bg-dark-canvas border border-line dark:border-dark-line rounded-md px-2 py-1">
                    📷 {photo.meta}
                  </span>
                )}
              </div>
            )}

            {photo.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {photo.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { onSelectTag(tag.replace('#', '')); onClose(); }}
                    className="text-[11.5px] text-orange hover:underline font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-line dark:border-dark-line pt-3 mt-1">
              <h4 className="text-[12px] font-semibold text-muted dark:text-dark-muted mb-2.5">Comments ({comments.length})</h4>
              <div className="grid gap-2.5">
                {comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 text-[12.5px]">
                    <Avatar person={c.person} size="xs" />
                    <div className="flex-1 bg-canvas/70 dark:bg-dark-canvas/70 rounded-xl px-3 py-1.5">
                      <strong className="text-ink dark:text-dark-ink mr-1.5">{c.person.name}</strong>
                      <span className="text-ink/80 dark:text-dark-ink/80">{c.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action bar & Comment input */}
          <div className="p-4 border-t border-line dark:border-dark-line bg-paper dark:bg-dark-paper">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors ${liked ? 'text-orange' : 'text-muted dark:text-dark-muted hover:text-ink'}`}
                >
                  <Icon name="heart" filled={liked} className={`w-5 h-5 ${liked ? 'animate-pop text-orange fill-orange' : ''}`} />
                  <span>{likesCount}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink p-1 rounded-full transition-colors"
                  aria-label="Share"
                >
                  <Icon name="send" className="w-[18px] h-[18px]" />
                </button>
              </div>
              <button
                onClick={handleSave}
                className={`p-1 rounded-full transition-colors ${saved ? 'text-ink dark:text-dark-ink' : 'text-muted dark:text-dark-muted hover:text-ink'}`}
                aria-label="Bookmark"
              >
                <Icon name="bookmark" filled={saved} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddComment} className="flex items-center gap-2">
              <Avatar person={profile} size="xs" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 min-w-0 border border-line/60 dark:border-dark-line/60 outline-none focus:border-orange dark:focus:border-orange bg-canvas dark:bg-dark-canvas rounded-xl px-3 py-1.5 text-[12.5px] text-ink dark:text-dark-ink placeholder:text-muted transition-colors"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="text-orange text-[12.5px] font-bold disabled:opacity-40 hover:opacity-90 px-2 py-1"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const categoriesList = ['All', 'Photography', 'Design', 'Travel', 'Art', 'Tech']

export default function ExplorePage() {
  const [following, setFollowing] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState(null)

  const toggleFollow = (personId) => {
    setFollowing((current) =>
      current.includes(personId) ? current.filter((id) => id !== personId) : [...current, personId]
    )
  }

  const currentCategoryData = categoriesData[activeCategory] || categoriesData.All
  const items = currentCategoryData.items

  const filteredItems = selectedTag
    ? items.filter((item) => item.tags?.some((t) => t.toLowerCase() === `#${selectedTag.toLowerCase()}`))
    : items

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    setSelectedTag(null)
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 pt-7 sm:pt-9 pb-24 md:pb-16 animate-fade-in">
      {/* Title & Discovery Header */}
      <div className="mb-6">
        <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-1.5">Discover</p>
        <h1 className="font-display font-semibold text-[26px] sm:text-[28px] tracking-tight text-ink dark:text-dark-ink">Explore</h1>
        <p className="text-muted dark:text-dark-muted text-[13px] mt-0.5">Fresh curated moments, crafts, and creators across Verve.</p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 mb-6">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 rounded-xl text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${activeCategory === cat ? 'bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas shadow-md scale-[1.02]' : 'border border-line dark:border-dark-line text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink hover:bg-paper dark:hover:bg-dark-paper bg-paper/60 dark:bg-dark-paper/60'}`}
          >
            <span>{cat}</span>
            {activeCategory === cat && (
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            )}
          </button>
        ))}
      </div>

      {/* Category Spotlight Banner */}
      <section className="border border-line dark:border-dark-line rounded-2xl p-5 sm:p-6 bg-paper dark:bg-dark-paper mb-8 shadow-sm animate-rise">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-orange bg-orange-soft/40 dark:bg-dark-line px-2.5 py-0.5 rounded-full">
                {currentCategoryData.name} Spotlight
              </span>
              <span className="text-[11px] text-muted dark:text-dark-muted">{currentCategoryData.stats}</span>
            </div>
            <h2 className="font-display font-semibold text-[18px] sm:text-[20px] text-ink dark:text-dark-ink mt-2">
              {currentCategoryData.tagline}
            </h2>
          </div>
        </div>

        {/* Category Trending Tag Chips */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-line/60 dark:border-dark-line/60">
          <span className="text-[11.5px] font-semibold text-muted dark:text-dark-muted self-center mr-1">Trending Tags:</span>
          {currentCategoryData.tags.map((tag) => {
            const cleanTag = tag.replace('#', '')
            const isTagActive = selectedTag?.toLowerCase() === cleanTag.toLowerCase()
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isTagActive ? null : cleanTag)}
                className={`text-[11.5px] font-medium px-3 py-1 rounded-lg border transition-all active:scale-95 ${isTagActive ? 'bg-orange text-white border-orange shadow-sm font-semibold' : 'border-line dark:border-dark-line bg-canvas/60 dark:bg-dark-canvas/60 text-ink dark:text-dark-ink hover:border-orange hover:text-orange'}`}
              >
                {tag} {isTagActive && '✕'}
              </button>
            )
          })}
        </div>
      </section>

      {/* Suggested Creators */}
      <section className="mb-9 animate-rise" style={{ animationDelay: '.1s' }}>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-display font-semibold text-[15px] text-ink dark:text-dark-ink">Featured Creators</h2>
          <span className="text-[11.5px] text-muted">Tap to view profiles</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {people.map((person) => (
            <div
              key={person.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPerson(person)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedPerson(person) }}
              className="flex items-center gap-3 border border-line dark:border-dark-line rounded-2xl p-3.5 bg-paper dark:bg-dark-paper cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Avatar person={person} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink dark:text-dark-ink truncate">{person.name}</p>
                <p className="text-[11.5px] text-muted truncate">{person.bio}</p>
              </div>
              <button
                onClick={(event) => { event.stopPropagation(); toggleFollow(person.id) }}
                className={`text-[11.5px] font-semibold rounded-xl px-3.5 py-1.5 flex-none transition-all active:scale-95 ${following.includes(person.id) ? 'border border-line dark:border-dark-line text-ink dark:text-dark-ink hover:bg-canvas dark:hover:bg-dark-canvas' : 'bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas hover:opacity-90 shadow-sm'}`}
              >
                {following.includes(person.id) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Media Collection Grid */}
      <section className="animate-rise" style={{ animationDelay: '.15s' }}>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-semibold text-[15px] text-ink dark:text-dark-ink">
              {activeCategory} Visuals
            </h2>
            <span className="text-[12px] text-muted">({filteredItems.length} items)</span>
          </div>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11.5px] text-orange hover:underline font-semibold"
            >
              Clear tag #{selectedTag}
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="border border-dashed border-line dark:border-dark-line rounded-2xl p-12 text-center my-4">
            <p className="text-muted text-[13.5px]">No items found matching #{selectedTag}.</p>
            <button onClick={() => setSelectedTag(null)} className="mt-3 text-[12px] font-semibold text-orange hover:underline">Show all in {activeCategory}</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPhoto(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(item) }}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer bg-canvas dark:bg-dark-canvas border border-line/40 dark:border-dark-line/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-[12.5px] font-semibold truncate leading-tight">{item.title}</p>
                  <p className="text-white/70 text-[11px] truncate mt-0.5">{item.author.name}</p>
                  <div className="flex items-center gap-3.5 mt-2 text-white text-[12px] font-semibold">
                    <span className="flex items-center gap-1"><Icon name="heart" filled className="w-3.5 h-3.5 text-orange" />{item.likes}</span>
                    <span className="flex items-center gap-1"><Icon name="comment" className="w-3.5 h-3.5" />{item.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      {selectedPerson && (
        <PersonProfileModal
          person={selectedPerson}
          isFollowing={following.includes(selectedPerson.id)}
          onFollow={() => toggleFollow(selectedPerson.id)}
          onClose={() => setSelectedPerson(null)}
        />
      )}

      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          isFollowing={following.includes(selectedPhoto.author.id)}
          onFollow={() => toggleFollow(selectedPhoto.author.id)}
          onClose={() => setSelectedPhoto(null)}
          onSelectTag={(tag) => setSelectedTag(tag)}
        />
      )}
    </div>
  )
}
