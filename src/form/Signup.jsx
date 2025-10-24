import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		// demo
		console.log('Signup', { name, email })
		 setMessage('Đăng ký thành công (demo).')
		 // show toast
		 window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Đăng ký thành công. Bạn có thể đăng nhập.', type: 'success' } }))
		 // redirect to signin
		 navigate('/signin')
	}

	return (
		<main className="max-w-md mx-auto px-4 py-10">
			<h1 className="text-2xl font-bold text-center text-green-700">Đăng ký</h1>
			<form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow">
				{message && <div className="mb-4 text-green-700 bg-green-100 px-3 py-2 rounded">{message}</div>}
				<label className="block text-sm font-medium text-gray-700">Họ tên</label>
				<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />

				<label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />

				<label className="block text-sm font-medium text-gray-700 mt-4">Mật khẩu</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />

				<button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Đăng ký</button>

				<p className="mt-4 text-sm text-center text-gray-600">Đã có tài khoản? <Link to="/signin" className="text-green-700">Đăng nhập</Link></p>
			</form>
		</main>
	)
}
