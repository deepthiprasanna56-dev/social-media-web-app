import { useApp } from '../context/useApp.js'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className="fixed z-[60] bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-ink dark:bg-dark-ink text-white dark:text-dark-canvas px-4.5 py-2.5 rounded-lg text-[12px] shadow-xl animate-toast">
      {toast}
    </div>
  )
}
