import { useState } from 'react'

export default function Notification() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Bạn đã học 10 từ mới hôm nay!", time: '1 giờ trước', read: false },
    { id: 2, text: "Chủ đề mới 'Thực phẩm' đã có sẵn.", time: 'Hôm nay', read: false },
  ])

  function markAllRead() {
    setNotes((s) => s.map((n) => ({ ...n, read: true })))
  }

  function clearAll() {
    setNotes([])
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Thông báo</h1>
        <div className="space-x-2">
          <button onClick={markAllRead} className="text-sm px-3 py-1 bg-gray-100 rounded">Đánh dấu tất cả là đã đọc</button>
          <button onClick={clearAll} className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded">Xoá tất cả</button>
        </div>
      </header>

      <section className="mt-6">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Bạn đã cập nhật hết! 🎉</div>
        ) : (
          <ul className="space-y-3">
            {notes.map((n) => (
              <li key={n.id} className={`flex items-start space-x-3 p-3 border rounded ${n.read ? 'bg-gray-50' : 'bg-white'}`}>
                <span className="text-blue-600 mt-1">🔔</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                </div>
                {!n.read && <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">Mới</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
