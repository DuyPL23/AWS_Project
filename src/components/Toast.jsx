import { useEffect, useState, useRef } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export default function Toasts() {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  useEffect(() => {
    function onToast(e) {
      const id = Date.now() + Math.random()
      const t = {
        id,
        message: e.detail?.message || '',
        type: e.detail?.type || 'info',
        timeout: e.detail?.timeout || 3500,
      }
      setToasts((s) => [...s, t])

      const timer = setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id))
        timers.current.delete(id)
      }, t.timeout)

      timers.current.set(id, timer)
    }

    window.addEventListener('toast', onToast)
    return () => {
      window.removeEventListener('toast', onToast)
      // clear timers
      timers.current.forEach((v) => clearTimeout(v))
      timers.current.clear()
    }
  }, [])

  function remove(id) {
    const t = timers.current.get(id)
    if (t) clearTimeout(t)
    timers.current.delete(id)
    setToasts((s) => s.filter((x) => x.id !== id))
  }

  function icon(type) {
    if (type === 'success') return <CheckCircle size={18} />
    if (type === 'error') return <AlertCircle size={18} />
    return <Info size={18} />
  }

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm w-full bg-opacity-95 text-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out translate-y-0 opacity-100`}>
          <div className={`flex items-start gap-3 p-3 ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}>
            <div className="mt-0.5">{icon(t.type)}</div>
            <div className="flex-1 text-sm leading-snug">{t.message}</div>
            <button onClick={() => remove(t.id)} className="ml-2 text-white opacity-80 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
