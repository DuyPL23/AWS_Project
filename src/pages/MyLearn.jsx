import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart2, Trophy, Clock } from 'lucide-react'

export default function MyLearn() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!raw) {
      navigate('/signin')
      return
    }
    setUser(JSON.parse(raw))

    // Demo lessons data (in a real app this comes from API)
    // Use ids that match the topics in Lesson (demoVocab) so clicking "Tiếp tục học" opens the correct vocabulary
    setLessons([
      { id: 'animals', title: 'Động vật - Cơ bản', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=60', progress: 60, duration: 12, preview: 'Mèo, Chó, Voi' },
      { id: 'food', title: 'Thực phẩm - Người mới bắt đầu', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60', progress: 20, duration: 8, preview: 'Bánh mì, Táo, Gạo' },
      { id: 'travel', title: 'Du lịch - Thiết yếu', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60', progress: 0, duration: 15, preview: 'Vé, Hộ chiếu, Hành lý' },
    ])
  }, [])

  const totalCompleted = lessons.filter((l) => l.progress === 100).length
  const totalTime = lessons.reduce((s, l) => s + l.duration * (l.progress / 100), 0)

  const suggested = lessons.find((l) => l.progress > 0 && l.progress < 100) || lessons[0]

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-green-700">My Learn</h1>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-500">Bài đã hoàn thành</div>
                  <div className="text-xl font-bold">{totalCompleted}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Tổng thời gian học (ước tính)</div>
                  <div className="text-xl font-bold">{Math.round(totalTime)} phút</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Biểu đồ tiến độ</div>
              <div className="w-full h-24 bg-gray-100 rounded flex items-end p-2">
                {/* Simple horizontal bars as demo */}
                <div className="flex-1 h-full flex gap-2 items-end">
                  {lessons.map((l) => (
                    <div key={l.id} className="flex-1 h-full flex items-end">
                      <div className="w-full bg-green-400 rounded-t transition-all" style={{ height: `${l.progress}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Lessons list */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">My Lessons</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {lessons.map((l) => (
                <div key={l.id} className="flex items-center gap-4 p-3 border rounded hover:shadow-lg transition">
                  <img src={l.img} alt={l.title} className="w-28 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{l.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{Math.round(l.progress)}% hoàn thành</div>
                    {l.preview && <div className="text-xs text-gray-400 mt-1">Ví dụ: {l.preview}</div>}
                    <div className="w-full bg-gray-200 h-2 rounded mt-2">
                      <div className="bg-green-600 h-2 rounded" style={{ width: `${l.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button onClick={() => navigate(`/lesson/${l.id}`)} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">Tiếp tục học</button>
                    <div className="text-xs text-gray-500 mt-2">{l.duration} phút</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded">Huy hiệu Học viên mới</div>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded">Hoàn thành 5 bài</div>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded">Đăng nhập liên tục 7 ngày</div>
            </div>
          </div>

          {/* Suggested Next Lesson */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Suggested Next Lesson</h2>
            {suggested ? (
              <div className="mt-4 flex items-center gap-4">
                <img src={suggested.img} alt={suggested.title} className="w-32 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{suggested.title}</div>
                  <div className="text-sm text-gray-500">{suggested.progress}% hoàn thành</div>
                  {suggested.preview && <div className="text-xs text-gray-400 mt-1">Ví dụ: {suggested.preview}</div>}
                </div>
                <div>
                  <button onClick={() => navigate(`/lesson/${suggested.id}`)} className="bg-green-600 text-white px-4 py-2 rounded">Tiếp tục</button>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-gray-500">Không có gợi ý.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
