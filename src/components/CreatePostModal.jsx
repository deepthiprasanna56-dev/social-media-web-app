import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { useApp } from '../context/useApp.js'

export default function CreatePostModal({ mode = 'post', onClose }) {
  const { profile, createPost, addStoryItem } = useApp()
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [storyType, setStoryType] = useState('photo')
  const [error, setError] = useState('')

  const pickImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return }
    setError('')
    setImage(URL.createObjectURL(file))
  }

  const submit = () => {
    if (mode === 'story') {
      if (storyType === 'photo' && !image) { setError('Add a photo for your story.'); return }
      if (storyType === 'text' && !text.trim()) { setError('Write something for your story.'); return }
      addStoryItem({ image: storyType === 'photo' ? image : '', text: storyType === 'text' ? text : '' })
      onClose()
      return
    }
    if (!text.trim() && !image) { setError('Write something or add a photo first.'); return }
    createPost({ text, image })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 dark:bg-black/70 backdrop-blur-sm grid place-items-center p-4 sm:p-6 animate-fade-in" onClick={onClose}>
      <section className="w-full max-w-[520px] bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-line dark:border-dark-line">
          <h2 className="font-display font-semibold text-lg text-ink dark:text-dark-ink">{mode === 'story' ? 'Add to your story' : 'Create a post'}</h2>
          <button onClick={onClose} aria-label="Close modal" className="text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink p-1.5 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"><Icon name="close" className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-2.5 my-4 text-[13px] font-semibold text-ink dark:text-dark-ink"><Avatar person={profile} size="sm" />{profile.name}</div>
        {mode === 'story' && (
          <div className="grid grid-cols-2 gap-1 p-1 mb-4 rounded-lg bg-canvas dark:bg-dark-canvas" role="tablist" aria-label="Story type">
            {[['photo', 'photo', 'Photo'], ['text', 'edit', 'Text']].map(([value, icon, label]) => (
              <button key={value} type="button" role="tab" aria-selected={storyType === value} onClick={() => { setStoryType(value); setError('') }} className={`flex items-center justify-center gap-2 rounded-md py-2 text-[12px] font-semibold transition-all ${storyType === value ? 'bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink shadow-sm' : 'text-muted dark:text-dark-muted hover:text-ink'}`}><Icon name={icon} className="w-4 h-4" /> {label}</button>
            ))}
          </div>
        )}
        {(mode !== 'story' || storyType === 'text') && <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === 'story' ? 'Share a thought...' : "What's on your mind?"} className="w-full min-h-[120px] resize-y border border-line/60 dark:border-dark-line/60 outline-none focus:border-orange dark:focus:border-orange bg-canvas dark:bg-dark-canvas rounded-xl p-3.5 text-[13px] text-ink dark:text-dark-ink placeholder:text-muted transition-colors" />}
        {image ? <div className="relative mt-3 rounded-xl overflow-hidden bg-canvas dark:bg-dark-canvas"><img src={image} alt="Selected preview" className="w-full max-h-[260px] object-cover rounded-xl" /><button onClick={() => setImage('')} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors" aria-label="Remove photo"><Icon name="close" className="w-4 h-4" /></button></div> : mode === 'story' && storyType === 'photo' && <label className="mt-3 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-line dark:border-dark-line rounded-xl py-10 text-muted hover:text-orange hover:border-orange cursor-pointer transition-colors"><Icon name="camera" className="w-7 h-7" /><span className="text-[12.5px] font-medium">Choose a photo for your story</span><input type="file" accept="image/*" className="hidden" onChange={pickImage} /></label>}
        {error && <p className="text-orange text-[12px] mt-2.5 font-medium">{error}</p>}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-line dark:border-dark-line">
          {(mode !== 'story' || storyType === 'photo') && <label className="flex items-center gap-2 text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink text-[12.5px] font-medium cursor-pointer p-1.5 rounded-lg hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"><Icon name="photo" className="w-5 h-5 text-orange" />Add photo<input type="file" accept="image/*" className="hidden" onChange={pickImage} /></label>}
          <button onClick={submit} className="ml-auto bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas hover:opacity-90 active:scale-95 transition-all rounded-xl px-5 py-2.5 text-[12.5px] font-semibold">{mode === 'story' ? 'Share to story' : 'Publish'}</button>
        </div>
      </section>
    </div>
  )
}
