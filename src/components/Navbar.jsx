import { NavLink, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, Bell } from 'lucide-react'
import ConfirmModal from './ConfirmModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const debounceRef = useRef(null)
  const [user, setUser] = useState(null)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const avatarRef = useRef(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    try {
      const rawLocal = localStorage.getItem('user')
      const rawSession = sessionStorage.getItem('user')
      const raw = rawLocal || rawSession
      if (raw) setUser(JSON.parse(raw))
    } catch (err) {
      // ignore
    }
  }, [])

  useEffect(() => {
    function onAuth(e) {
      try {
        const rawLocal = localStorage.getItem('user')
        const rawSession = sessionStorage.getItem('user')
        const raw = rawLocal || rawSession
        if (raw) setUser(JSON.parse(raw))
        else setUser(null)
      } catch (_) {
        setUser(null)
      }
    }
    window.addEventListener('authChanged', onAuth)
    return () => window.removeEventListener('authChanged', onAuth)
  }, [])

  // close avatar menu on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!avatarRef.current) return
      if (!avatarRef.current.contains(e.target)) setAvatarOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])
  
  // Sync search input with URL query parameter
  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam !== null) {
      setSearch(qParam)
    }
  }, [searchParams])

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-100'
    }`

  return (
    <>
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
  <h1 className="text-xl font-bold text-green-700">English Journey</h1>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/mylearn" className={linkClass}>My Learn</NavLink>
          {/* Inline search: desktop only */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>

              <input
              type="text"
              value={search}
              onChange={(e) => {
                const v = e.target.value
                setSearch(v)

                // simple debounce before navigating or calling search
                if (debounceRef.current) clearTimeout(debounceRef.current)
                debounceRef.current = setTimeout(() => {
                  // Always navigate to search page, with or without query param
                  navigate(`/search${v.trim() ? `?q=${encodeURIComponent(v.trim())}` : ''}`)
                }, 300)
              }}
              placeholder="Tìm kiếm khóa học... (động vật, thực phẩm, du lịch)"
              className="pl-10 pr-4 py-2 border bg-gray-50 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Tìm kiếm khóa học"
            />
          </div>
          {user && (
            <NavLink to="/notification" className={linkClass}>
              <Bell size={18} className="inline-block mr-1" /> Thông báo
            </NavLink>
          )}

          {/* Auth actions */}
          {user ? (
            <div className="relative" ref={avatarRef}>
              <button onClick={() => setAvatarOpen((s) => !s)} className="focus:outline-none">
                <img src={user.avatar || 'https://i.pravatar.cc/40'} alt="avatar" className="w-8 h-8 rounded-full border border-gray-300" />
              </button>

              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hồ sơ</Link>
                  <button
                    onClick={() => {
                      // open confirm modal
                      setConfirmOpen(true)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/signin" className="text-sm text-gray-700 px-3 py-1 hover:bg-gray-100 rounded">Đăng nhập</Link>
              <Link to="/signup" className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col space-y-1 px-4 pb-3">
          {/* Mobile search */}
          <div className="relative py-2 mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                const v = e.target.value
                setSearch(v)
                
                if (debounceRef.current) clearTimeout(debounceRef.current)
                debounceRef.current = setTimeout(() => {
                  navigate(`/search${v.trim() ? `?q=${encodeURIComponent(v.trim())}` : ''}`)
                  setOpen(false)  // Close mobile menu after search
                }, 300)
              }}
              placeholder="Tìm kiếm khóa học..."
              className="pl-10 pr-4 py-2 border bg-gray-50 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Tìm kiếm khóa học"
            />
          </div>

          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/mylearn" className={linkClass}>My Learn</NavLink>
          {user && <NavLink to="/notification" className={linkClass}>Thông báo</NavLink>}
          {!user && (
            <>
              <NavLink to="/signin" className={linkClass}>Đăng nhập</NavLink>
              <NavLink to="/signup" className={linkClass}>Đăng ký</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
    <ConfirmModal
      open={confirmOpen}
      title="Xác nhận đăng xuất"
      message="Bạn có chắc muốn đăng xuất không?"
      onCancel={() => setConfirmOpen(false)}
      onConfirm={() => {
        // perform logout
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        window.dispatchEvent(new CustomEvent('authChanged'))
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Đã đăng xuất', type: 'info' } }))
        setUser(null)
        setAvatarOpen(false)
        setConfirmOpen(false)
        navigate('/')
      }}
    />
    </>
  )
}
