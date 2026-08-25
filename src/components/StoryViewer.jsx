import { useEffect, useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { useApp } from '../context/useApp.js'

export default function StoryViewer({ storyId, onClose, onChangeStory }) {
  const { stories, markStoryViewed } = useApp()
  const index = stories.findIndex((s) => s.id === storyId)
  const story = stories[index]
  const [itemIndex, setItemIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const goNext = () => {
    if (!story) return
    if (itemIndex < story.items.length - 1) {
      setItemIndex((i) => i + 1)
      setProgress(0)
    } else if (index < stories.length - 1) {
      onChangeStory(stories[index + 1].id)
    } else {
      onClose()
    }
  }

  const goPrev = () => {
    if (itemIndex > 0) {
      setItemIndex((i) => i - 1)
      setProgress(0)
    } else if (index > 0) {
      onChangeStory(stories[index - 1].id)
    }
  }

  useEffect(() => {
    if (!story) return
    markStoryViewed(story.id)
    const start = Date.now()
    const duration = 4500
    const timer = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(pct)
      if (pct >= 100) {
        window.clearInterval(timer)
        goNext()
      }
    }, 60)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId, itemIndex])

  if (!story) return null

  const item = story.items[itemIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-[420px] h-[85vh] max-h-[720px] rounded-2xl overflow-hidden bg-ink" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1.5">
          {story.items.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full bg-white transition-[width] duration-75 ease-linear"
                style={{ width: `${i < itemIndex ? 100 : i === itemIndex ? progress : 0}%` }}
              />
            </div>
          ))}
        </div>
        <div className="absolute top-7 left-3 right-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar person={story.person} size="sm" ring />
            <span className="text-white text-[13px] font-semibold">{story.person.name}</span>
          </div>
          <button onClick={onClose} className="text-white p-1" aria-label="Close story">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        {item.type === 'text' ? (
          <div className="w-full h-full flex items-center justify-center px-8 text-center" style={{ backgroundColor: item.background || '#ff795d' }}>
            <p className="max-w-[330px] text-white font-display font-semibold text-[28px] leading-tight break-words">{item.text}</p>
          </div>
        ) : (
          <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
        )}
        {item.caption && item.type !== 'text' && (
          <p className="absolute bottom-6 left-4 right-4 text-white text-[13px] bg-black/30 backdrop-blur px-3 py-2 rounded-lg">{item.caption}</p>
        )}

        <button onClick={goPrev} className="absolute left-0 top-0 h-full w-1/3" aria-label="Previous story" />
        <button onClick={goNext} className="absolute right-0 top-0 h-full w-1/3" aria-label="Next story" />

        <button onClick={goPrev} className="hidden sm:grid absolute -left-12 top-1/2 -translate-y-1/2 place-items-center w-9 h-9 rounded-full bg-white/10 text-white">
          <Icon name="chevronLeft" className="w-5 h-5" />
        </button>
        <button onClick={goNext} className="hidden sm:grid absolute -right-12 top-1/2 -translate-y-1/2 place-items-center w-9 h-9 rounded-full bg-white/10 text-white">
          <Icon name="chevronRight" className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
