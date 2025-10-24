import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (raw) {
      const u = JSON.parse(raw)
      setUser(u)
      setName(u.name || '')
      setAvatar(u.avatar || '')
    } else {
      navigate('/signin')
    }
  }, [])

  function handleSave(e) {
    e.preventDefault()
    const newUser = { ...user, name, avatar }
    // Save back to whichever storage currently holds user (prefers local)
    if (localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify(newUser))
    else sessionStorage.setItem('user', JSON.stringify(newUser))
    // trigger update and show toast
    window.dispatchEvent(new CustomEvent('authChanged'))
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hồ sơ đã được lưu', type: 'success' } }))
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-green-700">Hồ sơ của tôi</h1>
      <form onSubmit={handleSave} className="mt-6 bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700">Tên</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />

        <label className="block text-sm font-medium text-gray-700 mt-4">Avatar URL</label>
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />

        <div className="mt-4 text-center">
          <img src={avatar || 'https://i.pravatar.cc/80'} alt="avatar" className="w-20 h-20 rounded-full mx-auto" />
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Lưu</button>
      </form>
    </main>
  )
}
