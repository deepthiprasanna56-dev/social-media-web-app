import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full flex-none transition-colors relative p-0.5 inline-flex items-center cursor-pointer ${checked ? 'bg-orange' : 'bg-line dark:bg-dark-line'}`}
      aria-pressed={checked}
    >
      <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out pointer-events-none transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

function Row({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-line dark:border-dark-line last:border-0 gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-ink dark:text-dark-ink">{label}</p>
        {sub && <p className="text-[11.5px] text-muted dark:text-dark-muted mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const { settings, updateSettings, dark, setDark, logout, profile, updateProfile } = useApp()
  const [email, setEmail] = useState('olivia@example.com')
  const [emailSaved, setEmailSaved] = useState(false)
  const [name, setName] = useState(profile.name)

  const saveAccount = (e) => {
    e.preventDefault()
    updateProfile({ name: name.trim() || profile.name })
    setEmailSaved(true)
    window.setTimeout(() => setEmailSaved(false), 2000)
  }

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-8 pt-9 pb-24 md:pb-16">
      <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-2.5">Workspace</p>
      <h1 className="font-display font-semibold text-[26px] tracking-tight text-ink dark:text-dark-ink mb-8">Settings</h1>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-[14px] text-ink dark:text-dark-ink mb-3">Account</h2>
        <form onSubmit={saveAccount} className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper p-5 grid gap-3.5">
          <label className="grid gap-1.5 text-[12.5px] font-semibold text-ink dark:text-dark-ink">
            Display name
            <input value={name} onChange={(e) => setName(e.target.value)} className="border border-line dark:border-dark-line rounded-lg px-3 py-2.5 text-[13px] bg-canvas dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink" />
          </label>
          <label className="grid gap-1.5 text-[12.5px] font-semibold text-ink dark:text-dark-ink">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-line dark:border-dark-line rounded-lg px-3 py-2.5 text-[13px] bg-canvas dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink" />
          </label>
          <button className="justify-self-start bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas rounded-lg px-4 py-2.5 text-[12.5px] font-semibold mt-1">
            {emailSaved ? 'Saved ✓' : 'Save changes'}
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-[14px] text-ink dark:text-dark-ink mb-3">Appearance</h2>
        <div className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper px-5">
          <Row label="Dark mode" sub="Switch the whole app to a darker palette">
            <Toggle checked={dark} onChange={setDark} />
          </Row>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-[14px] text-ink dark:text-dark-ink mb-3">Privacy</h2>
        <div className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper px-5">
          <Row label="Private account" sub="Only approved followers can see your posts">
            <Toggle checked={settings.privateAccount} onChange={(v) => updateSettings({ privateAccount: v })} />
          </Row>
          <Row label="Show activity status" sub="Let others see when you're active">
            <Toggle checked={settings.showActivityStatus} onChange={(v) => updateSettings({ showActivityStatus: v })} />
          </Row>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-[14px] text-ink dark:text-dark-ink mb-3">Notifications</h2>
        <div className="border border-line dark:border-dark-line rounded-2xl bg-paper dark:bg-dark-paper px-5">
          <Row label="Push notifications" sub="Likes, comments and new followers">
            <Toggle checked={settings.pushNotifications} onChange={(v) => updateSettings({ pushNotifications: v })} />
          </Row>
          <Row label="Email updates" sub="Occasional summaries of your activity">
            <Toggle checked={settings.emailUpdates} onChange={(v) => updateSettings({ emailUpdates: v })} />
          </Row>
        </div>
      </section>

      <button onClick={logout} className="flex items-center gap-2 text-orange text-[13px] font-semibold py-2">
        <Icon name="logout" className="w-4 h-4" /> Sign out
      </button>
    </div>
  )
}
