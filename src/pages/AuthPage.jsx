import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { useApp } from '../context/useApp.js'

function Field({ label, error, children }) {
  return (
    <label className="grid gap-1.5 text-[13px] font-semibold text-ink dark:text-dark-ink">
      {label}
      {children}
      {error && <span className="text-xs font-normal text-orange">{error}</span>}
    </label>
  )
}

export default function AuthPage() {
  const { login, signup } = useApp()
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (mode === 'signup' && form.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Password needs at least 6 characters.'
    if (mode === 'signup' && form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      if (mode === 'login') login()
      else signup(form.name.trim(), form.email.trim())
    }, 450)
  }

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'signup' : 'login'))
    setErrors({})
  }

  return (
    <main className="min-h-screen w-full grid place-items-center bg-canvas dark:bg-dark-canvas px-6 py-10">
      <div className="w-full max-w-[440px] bg-paper dark:bg-dark-paper border border-line dark:border-dark-line rounded-2xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(32,35,31,0.08)]">
        <div className="flex items-center gap-2.5 mb-9 font-display font-bold text-2xl tracking-tight text-ink dark:text-dark-ink">
          <span className="grid place-items-center w-8 h-8 rounded-[10px_10px_10px_2px] bg-orange text-white text-lg -rotate-6">v</span>
          <span>verve</span>
        </div>

        <p className="text-orange uppercase tracking-[1.5px] text-[10px] font-bold mb-2">Your people, in one place</p>
        <h1 className="font-display font-semibold text-[30px] leading-tight tracking-tight text-ink dark:text-dark-ink mb-1.5">
          {mode === 'login' ? 'Welcome back.' : 'Join the conversation.'}
        </h1>
        <p className="text-muted dark:text-dark-muted text-[13px]">
          {mode === 'login' ? 'Pick up where you left off.' : 'Make space for the moments that matter.'}
        </p>

        <form onSubmit={submit} className="grid gap-4 mt-7" noValidate>
          {mode === 'signup' && (
            <Field label="Full name" error={errors.name}>
              <input
                className="border border-line dark:border-dark-line rounded-lg px-3 py-2.5 text-[13px] bg-[#f8f9f5] dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink"
                placeholder="Olivia Rhye"
                value={form.name}
                onChange={set('name')}
              />
            </Field>
          )}
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              className="border border-line dark:border-dark-line rounded-lg px-3 py-2.5 text-[13px] bg-[#f8f9f5] dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-line dark:border-dark-line rounded-lg px-3 py-2.5 pr-10 text-[13px] bg-[#f8f9f5] dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink"
                placeholder="6+ characters"
                value={form.password}
                onChange={set('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} className="w-4 h-4" />
              </button>
            </div>
          </Field>
          {mode === 'signup' && (
            <Field label="Confirm password" error={errors.confirm}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="border border-line dark:border-dark-line rounded-lg px-3 py-2.5 text-[13px] bg-[#f8f9f5] dark:bg-dark-canvas outline-none focus:border-orange text-ink dark:text-dark-ink"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={set('confirm')}
              />
            </Field>
          )}

          <button
            disabled={submitting}
            className="w-full mt-1 bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas rounded-lg py-3 text-[13px] font-semibold disabled:opacity-60 transition"
          >
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <button onClick={switchMode} className="border-0 bg-transparent text-orange text-[12px] mt-6 mx-auto block font-medium">
          {mode === 'login' ? "New to Verve? Sign up" : 'Already have an account? Log in'}
        </button>
      </div>
    </main>
  )
}
