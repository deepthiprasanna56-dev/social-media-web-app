import { useEffect, useRef, useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

export default function MessagesPage() {
  const { conversations, sendMessage } = useApp()
  const [activeId, setActiveId] = useState(conversations[0]?.id)
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')
  const [showList, setShowList] = useState(true) // mobile toggle
  const messagesEndRef = useRef(null)

  const active = conversations.find((c) => c.id === activeId)
  const filteredConversations = conversations.filter((c) =>
    c.person.name.toLowerCase().includes(search.toLowerCase()) ||
    c.person.handle.toLowerCase().includes(search.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeId, active?.messages])

  const submit = (e) => {
    e.preventDefault()
    if (!draft.trim() || !active) return
    sendMessage(active.id, draft)
    setDraft('')
  }

  const openConversation = (id) => {
    setActiveId(id)
    setShowList(false)
  }

  return (
    <div className="max-w-[1000px] mx-auto px-0 md:px-8 pt-0 md:pt-7 pb-20 md:pb-16 animate-fade-in">
      <div className="hidden md:block mb-6 px-5 md:px-0">
        <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-2">Direct</p>
        <h1 className="font-display font-semibold text-[26px] tracking-tight text-ink dark:text-dark-ink">Messages</h1>
      </div>

      <div className="grid md:grid-cols-[320px_1fr] border-y md:border border-line dark:border-dark-line md:rounded-2xl overflow-hidden bg-paper dark:bg-dark-paper min-h-[calc(100vh-140px)] md:min-h-[580px] shadow-sm">
        {/* Left conversation list */}
        <div className={`${showList ? 'flex' : 'hidden'} md:flex flex-col border-r border-line dark:border-dark-line`}>
          <div className="p-3.5 border-b border-line dark:border-dark-line">
            <div className="flex items-center justify-between pb-2 font-display font-semibold text-[15px] text-ink dark:text-dark-ink md:hidden">
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-2 border border-line dark:border-dark-line rounded-xl px-3 py-2 bg-canvas/60 dark:bg-dark-canvas/60">
              <Icon name="search" className="w-4 h-4 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full border-0 outline-none bg-transparent text-[12.5px] text-ink dark:text-dark-ink placeholder:text-muted"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-muted text-[12.5px] py-8">No chats found.</p>
            ) : (
              filteredConversations.map((c) => {
                const last = c.messages.at(-1)
                return (
                  <button
                    key={c.id}
                    onClick={() => openConversation(c.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-line/50 dark:border-dark-line/50 transition-colors ${activeId === c.id ? 'bg-lime-soft/60 dark:bg-dark-line/50' : 'hover:bg-canvas/60 dark:hover:bg-dark-canvas/60'}`}
                  >
                    <div className="relative flex-none">
                      <Avatar person={c.person} size="md" />
                      {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-lime border-2 border-paper dark:border-dark-paper" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[13px] font-semibold text-ink dark:text-dark-ink truncate">{c.person.name}</p>
                        <span className="text-[10px] text-muted flex-none">{last?.time}</span>
                      </div>
                      <p className="text-[11.5px] text-muted dark:text-dark-muted truncate mt-0.5">{last?.from === 'me' ? 'You: ' : ''}{last?.text}</p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Right chat panel */}
        <div className={`${showList ? 'hidden' : 'flex'} md:flex flex-col h-full bg-paper dark:bg-dark-paper`}>
          {active ? (
            <>
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-line dark:border-dark-line bg-paper/80 dark:bg-dark-paper/80 backdrop-blur-sm">
                <button
                  onClick={() => setShowList(true)}
                  className="md:hidden text-ink dark:text-dark-ink p-1 rounded-full hover:bg-canvas dark:hover:bg-dark-canvas transition-colors"
                  aria-label="Back to conversations"
                >
                  <Icon name="chevronLeft" className="w-5 h-5" />
                </button>
                <Avatar person={active.person} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink dark:text-dark-ink truncate">{active.person.name}</p>
                  <p className="text-[11px] text-muted flex items-center gap-1.5">
                    {active.online && <span className="w-1.5 h-1.5 rounded-full bg-lime" />}
                    {active.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-5 py-5 flex flex-col gap-3">
                {active.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[80%] sm:max-w-[70%] ${m.from === 'me' ? 'self-end items-end' : 'self-start items-start'} flex flex-col gap-1 animate-fade-in`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed break-words ${m.from === 'me' ? 'bg-ink text-white dark:bg-orange dark:text-white rounded-br-xs' : 'bg-canvas dark:bg-dark-canvas text-ink dark:text-dark-ink rounded-bl-xs'}`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-muted px-1">{m.time}</span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={submit} className="flex items-center gap-2.5 border-t border-line dark:border-dark-line p-3 sm:p-4 bg-paper dark:bg-dark-paper">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 border border-line/60 dark:border-dark-line/60 outline-none focus:border-orange dark:focus:border-orange bg-canvas dark:bg-dark-canvas rounded-xl px-4 py-2.5 text-[13px] text-ink dark:text-dark-ink placeholder:text-muted transition-colors"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="w-10 h-10 grid place-items-center rounded-xl bg-orange text-white hover:opacity-90 active:scale-95 disabled:opacity-40 flex-none transition-all"
                  aria-label="Send message"
                >
                  <Icon name="send" className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="grid place-items-center h-full text-muted text-sm py-20">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </div>
  )
}
