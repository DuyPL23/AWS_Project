import { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

// Demo vocabulary (mock data)
const demoVocab = {
  animals: [
    { id: 'a1', word: 'Cat', meaning: 'Con mèo', example: 'The cat is sleeping.' },
    { id: 'a2', word: 'Dog', meaning: 'Con chó', example: 'The dog barks.' },
    { id: 'a3', word: 'Elephant', meaning: 'Con voi', example: 'The elephant is huge.' },
    { id: 'a4', word: 'Bird', meaning: 'Con chim', example: 'The bird is singing.' },
    { id: 'a5', word: 'Lion', meaning: 'Sư tử', example: 'The lion roars.' },
  ],
  food: [
    { id: 'f1', word: 'Bread', meaning: 'Bánh mì', example: 'I eat bread for breakfast.' },
    { id: 'f2', word: 'Apple', meaning: 'Táo', example: 'An apple a day keeps the doctor away.' },
    { id: 'f3', word: 'Rice', meaning: 'Gạo', example: 'Rice is a staple food in many countries.' },
  ],
  travel: [
    { id: 't1', word: 'Ticket', meaning: 'Vé', example: 'I need a ticket to the concert.' },
    { id: 't2', word: 'Passport', meaning: 'Hộ chiếu', example: 'Don’t forget your passport.' },
  ],
}

function storageKey(topic, user) {
  if (user && user.email) return `progress:${user.email}:${topic}`
  return `progress:${topic}`
}

// Async helpers wrap localStorage operations to allow async/await usage and
// make it easier to replace with remote calls later.
async function loadProgress(topic, user) {
  return new Promise((resolve) => {
    try {
      const key = storageKey(topic, user)
      const raw = localStorage.getItem(key) || sessionStorage.getItem(key)
      if (!raw) return resolve({})
      const parsed = JSON.parse(raw)
      resolve(parsed)
    } catch (err) {
      // swallow errors and return empty
      resolve({})
    }
  })
}

async function saveProgress(topic, user, data) {
  return new Promise((resolve) => {
    try {
      const key = storageKey(topic, user)
      if (!data || Object.keys(data).length === 0) {
        localStorage.removeItem(key)
        resolve(true)
      } else {
        localStorage.setItem(key, JSON.stringify(data))
        resolve(true)
      }
    } catch (err) {
      // fail silently for now
      resolve(false)
    }
  })
}

export default function Lesson() {
  const params = useParams()
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const topic = params.id || search.get('topic')

  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learned, setLearned] = useState({})
  const [mode, setMode] = useState('study')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // inject minimal styles for 3D flip (kept local so we don't need global CSS edits)
  useEffect(() => {
    const id = 'lesson-flip-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.innerHTML = `
      .perspective { perspective: 1200px; }
      .transform-style { transform-style: preserve-3d; transition: transform 600ms cubic-bezier(.2,.9,.3,1); }
      .transform-style.is-flipped { transform: rotateY(180deg); }
      .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
    `
    document.head.appendChild(style)
  }, [])

  // load user from storage (sync) then load progress (async)
  useEffect(() => {
    const rawUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    const parsed = rawUser ? JSON.parse(rawUser) : null
    setUser(parsed)
  }, [])

  // whenever topic or user changes, load words and progress
  useEffect(() => {
    let mounted = true
    async function init() {
      setLoading(true)
      const list = demoVocab[topic] || []
      if (mounted) setWords(list)
      setIndex(0)
      setFlipped(false)

      const progress = await loadProgress(topic, user)
      if (mounted) setLearned(progress || {})
      // query param mode support
      const m = new URLSearchParams(window.location.search).get('mode')
      if (mounted) setMode(m === 'review' ? 'review' : 'study')
      if (mounted) setLoading(false)
    }
    init()
    return () => { mounted = false }
  }, [topic, user])

  // save progress when `learned` changes
  useEffect(() => {
    let mounted = true
    async function persist() {
      await saveProgress(topic, user, learned)
      if (!mounted) return
    }
    persist()
    return () => { mounted = false }
  }, [learned, topic, user])

  const markLearned = useCallback(async (id) => {
    setLearned((s) => {
      const prev = s[id] || { intervalDays: 1 }
      const nextInterval = prev.intervalDays ? prev.intervalDays * 2 : 1
      const next = Date.now() + nextInterval * 24 * 60 * 60 * 1000
      return { ...s, [id]: { done: true, intervalDays: nextInterval, next } }
    })
  }, [])

  const markUnlearned = useCallback(async (id) => {
    setLearned((s) => {
      const n = { ...s }
      delete n[id]
      return n
    })
  }, [])

  if (!topic) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Bài học</h1>
        <p className="mt-4">Không tìm thấy chủ đề. Vui lòng chọn một chủ đề để bắt đầu.</p>
        <div className="mt-4 flex flex-col gap-2">
          <p>Các chủ đề hiện có:</p>
          <ul className="list-disc pl-5">
            <li><a href="/lesson/animals" className="text-green-600 hover:underline">Động vật - Cơ bản</a></li>
            <li><a href="/lesson/food" className="text-green-600 hover:underline">Thực phẩm - Người mới bắt đầu</a></li>
            <li><a href="/lesson/travel" className="text-green-600 hover:underline">Du lịch - Thiết yếu</a></li>
          </ul>
        </div>
      </main>
    )
  }

  const now = Date.now()
  let studyList = words
  if (mode === 'review') {
    const due = words.filter((w) => learned[w.id]?.next && learned[w.id].next <= now)
    studyList = due.length ? due : words.filter((w) => learned[w.id] && learned[w.id].done)
  }

  const current = studyList[index] || words[index]

  // Map topic IDs to Vietnamese titles
  const topicTitles = {
    'animals': 'Động vật - Cơ bản',
    'food': 'Thực phẩm - Người mới bắt đầu',
    'travel': 'Du lịch - Thiết yếu'
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">Bài học: {topicTitles[topic] || topic}</h1>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 underline">Quay lại</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6 flex flex-col items-center">
          {loading ? (
            <div className="text-gray-500">Đang tải...</div>
          ) : current ? (
            <div className="w-full max-w-xl">
              {/* Card container with 3D flip */}
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setFlipped((s) => !s) }}
                onClick={() => setFlipped((s) => !s)}
                className="mx-auto perspective"
                style={{ width: '100%', maxWidth: 640 }}
              >
                <div className={`relative w-full h-56 mx-auto transform-style preserve-3d transition-transform ${flipped ? 'is-flipped' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center backface-hidden">
                    <div className="text-4xl font-extrabold text-green-700">{current.word}</div>
                    <div className="mt-3 text-sm text-gray-500">Nhấn hoặc bấm phím Space/Enter để lật</div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-green-50 rounded-lg shadow-lg p-6 transform rotate-y-180 backface-hidden">
                    <div className="text-xl font-semibold text-gray-800">{current.meaning}</div>
                    <div className="mt-3 text-sm text-gray-600">Ví dụ: {current.example}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => { setIndex((i) => Math.max(0, i - 1)); setFlipped(false) }} className="px-3 py-2 rounded bg-gray-100">Trước</button>
                  <button onClick={() => setFlipped((s) => !s)} className="px-3 py-2 rounded bg-green-600 text-white">Lật thẻ</button>
                  <button onClick={() => { setIndex((i) => Math.min(words.length - 1, i + 1)); setFlipped(false) }} className="px-3 py-2 rounded bg-gray-100">Tiếp</button>
                </div>

                <div>
                  {learned[current.id] && learned[current.id].done ? (
                    <button onClick={() => markUnlearned(current.id)} className="px-3 py-2 rounded bg-yellow-100 text-yellow-800">Đã học (bỏ)</button>
                  ) : (
                    <button onClick={() => markLearned(current.id)} className="px-3 py-2 rounded bg-green-100 text-green-800">Đánh dấu đã học</button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-600">Không có từ vựng cho chủ đề này.</div>
          )}
        </div>

        <aside className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Danh sách từ</h3>
            <div className="flex gap-2">
              <button onClick={() => { setMode('study'); const sp = new URLSearchParams(window.location.search); sp.delete('mode'); window.history.replaceState({}, '', `${window.location.pathname}?${sp.toString()}`) }} className={`px-3 py-1 rounded ${mode==='study' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Học</button>
              <button onClick={() => { setMode('review'); const sp = new URLSearchParams(window.location.search); sp.set('mode','review'); window.history.replaceState({}, '', `${window.location.pathname}?${sp.toString()}`) }} className={`px-3 py-1 rounded ${mode==='review' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Ôn tập</button>
            </div>
          </div>

          <ul className="mt-3 space-y-2 max-h-80 overflow-auto">
            {words.map((w, idx) => {
              const s = learned[w.id]
              const due = s?.next && s.next <= now
              return (
                <li key={w.id} className={`p-2 rounded flex justify-between items-center ${index === idx ? 'bg-green-50' : ''}`}>
                  <div>
                    <div className="font-medium">{w.word} {due && <span className="text-xs text-yellow-700 ml-2">(Due)</span>}</div>
                    <div className="text-xs text-gray-500">{w.meaning}</div>
                    {s?.next && (
                      <div className="text-xs text-gray-400">Lần ôn tiếp: {new Date(s.next).toLocaleString()}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {s?.done && <span className="text-sm text-green-700">✓</span>}
                    <button onClick={() => { setIndex(idx); setFlipped(false) }} className="text-sm text-gray-600 underline">Mở</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </main>
  )
}
