import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { useApp } from '../context/useApp.js'

const rings = ['from-orange to-[#ffb199]', 'from-lime to-[#c5da67]', 'from-sky to-[#a7d4de]']

export default function StoriesBar({ onOpenStory, onAddStory }) {
  const { stories } = useApp()
  return (
    <section className="mb-10 animate-rise">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-[15px] text-ink dark:text-dark-ink">Stories</h2>
      </div>
      <div className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mx-1 px-1">
        <button onClick={onAddStory} className="grid gap-1.5 justify-items-center flex-none group">
          <span className="w-[62px] h-[62px] rounded-full border-2 border-dashed border-[#b7bdb3] dark:border-dark-line grid place-items-center text-ink dark:text-dark-ink group-hover:border-orange group-hover:text-orange transition-all duration-200 group-hover:scale-105">
            <Icon name="plus" className="w-5 h-5" />
          </span>
          <small className="text-[11px] font-medium text-muted dark:text-dark-muted">Your story</small>
        </button>
        {stories.map((story, i) => (
          <button key={story.id} onClick={() => onOpenStory(story.id)} className="grid gap-1.5 justify-items-center flex-none group">
            <span className={`w-[62px] h-[62px] rounded-full p-[3px] grid place-items-center bg-gradient-to-br transition-all duration-300 group-hover:scale-105 group-hover:shadow-md
              ${story.viewed ? 'from-line to-line dark:from-dark-line dark:to-dark-line' : rings[i % rings.length]}`}>
              <Avatar person={story.person} size="md" ring />
            </span>
            <small className="text-[11px] font-medium text-muted dark:text-dark-muted truncate w-[64px] text-center">{story.person.name.split(' ')[0]}</small>
          </button>
        ))}
      </div>
    </section>
  )
}
