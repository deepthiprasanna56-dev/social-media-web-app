import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import StoriesBar from '../components/StoriesBar.jsx'
import PostCard from '../components/PostCard.jsx'
import { useApp } from '../context/useApp.js'

export default function HomePage({ onOpenStory, onAddStory, onCompose }) {
  const { profile, posts } = useApp()
  const [sort, setSort] = useState('latest')
  const [sortOpen, setSortOpen] = useState(false)
  const visiblePosts = sort === 'popular' ? [...posts].sort((a, b) => b.likes - a.likes) : posts
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-8 pt-7 sm:pt-9 pb-24 md:pb-16 animate-fade-in">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9 sm:mb-11 animate-rise">
        <div>
          <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-2">{today}</p>
          <h1 className="font-display font-semibold text-[24px] sm:text-[30px] tracking-tight text-ink dark:text-dark-ink">
            Good to see you, {profile.name.split(' ')[0]} <span className="text-lime">✦</span>
          </h1>
          <p className="text-muted dark:text-dark-muted text-[13px] mt-1">A little inspiration from your corner of the internet.</p>
        </div>
        <button
          onClick={onCompose}
          className="flex items-center gap-2 border border-[#cbd2c6] dark:border-dark-line rounded-xl px-4 py-2.5 text-[12.5px] font-semibold text-ink dark:text-dark-ink hover:bg-paper dark:hover:bg-dark-paper hover:shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <Icon name="plus" className="w-4 h-4 text-orange" /> Create post
        </button>
      </section>

      <StoriesBar onOpenStory={onOpenStory} onAddStory={onAddStory} />

      <section className="animate-rise" style={{ animationDelay: '.1s' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-[15px] text-ink dark:text-dark-ink">For you</h2>
          <div className="relative">
            <button
              onClick={() => setSortOpen((open) => !open)}
              aria-expanded={sortOpen}
              className="flex items-center gap-1.5 text-[11.5px] font-medium text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-line dark:border-dark-line rounded-lg px-3 py-1.5 bg-paper dark:bg-dark-paper transition-colors"
            >
              {sort === 'latest' ? 'Latest' : 'Popular'} <Icon name="chevronDown" className="w-3.5 h-3.5" />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full z-20 mt-1 w-32 rounded-xl border border-line dark:border-dark-line bg-paper dark:bg-dark-paper py-1 shadow-lg animate-scale-in overflow-hidden">
                  {['latest', 'popular'].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSort(option); setSortOpen(false) }}
                      className={`block w-full px-3.5 py-2 text-left text-[12px] capitalize transition-colors ${sort === option ? 'text-orange font-semibold bg-canvas dark:bg-dark-canvas' : 'text-ink dark:text-dark-ink hover:bg-canvas dark:hover:bg-dark-canvas'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="border border-dashed border-line dark:border-dark-line rounded-2xl p-12 text-center my-6">
            <p className="text-muted text-[13.5px]">No posts yet — be the first to share something.</p>
            <button onClick={onCompose} className="mt-3 bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas px-4 py-2 rounded-lg text-[12px] font-semibold">Create first post</button>
          </div>
        ) : (
          visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </div>
  )
}
