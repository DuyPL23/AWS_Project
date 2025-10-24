import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function validate() {
    const e = {}
    if (!email) e.email = 'Vui lòng nhập email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email không hợp lệ.'
    if (!password) e.password = 'Vui lòng nhập mật khẩu.'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    setMessage('')
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      // Demo submit: replace with real API call
      console.log('Đăng nhập:', { email, password: '••••', remember })
      // Simulate user object and persist
      const user = { email, avatar: 'https://i.pravatar.cc/40' }
      if (remember) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        sessionStorage.setItem('user', JSON.stringify(user))
      }
        // notify other parts
        window.dispatchEvent(new CustomEvent('authChanged'))
        // show toast
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Đăng nhập thành công', type: 'success' } }))
        navigate('/')
      setMessage('Đăng nhập thành công (demo).')
      // navigate to home
      navigate('/')
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-green-700">Đăng nhập</h1>

      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow">
        {message && <div className="mb-4 text-green-700 bg-green-100 px-3 py-2 rounded">{message}</div>}

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-green-300'}`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}

        <label className="block text-sm font-medium text-gray-700 mt-4">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className={`mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-green-300'}`}
        />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}

        <div className="flex items-center justify-between mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2" />
            <span className="text-sm text-gray-700">Ghi nhớ đăng nhập</span>
          </label>

          <Link to="/" className="text-sm text-green-700 hover:underline">Quên mật khẩu?</Link>
        </div>

  <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Đăng nhập</button>

  <p className="mt-4 text-sm text-center text-gray-600">Chưa có tài khoản? <Link to="/signup" className="text-green-700 hover:underline">Đăng ký</Link></p>
      </form>
    </main>
  )
}
