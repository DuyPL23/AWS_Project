import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const topics = [
  { id: 'animals', title: 'Động vật - Cơ bản', titleEn: 'Animals - Basic', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=60', preview: 'Mèo, Chó, Voi', wordsVi: ['Mèo','Chó','Voi','Chim','Sư tử'], words: ['Cat','Dog','Elephant','Bird','Lion'] },
  { id: 'food', title: 'Thực phẩm - Người mới bắt đầu', titleEn: 'Food - Beginner', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60', preview: 'Bánh mì, Táo, Gạo', wordsVi: ['Bánh mì','Táo','Gạo','Đường'], words: ['Bread','Apple','Rice','Sugar'] },
  { id: 'travel', title: 'Du lịch - Thiết yếu', titleEn: 'Travel - Essentials', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60', preview: 'Vé, Hộ chiếu, Hành lý', wordsVi: ['Vé','Hộ chiếu','Hành lý','Điểm đến'], words: ['Ticket','Passport','Luggage','Destination'] },
]

export default function Search() {
  // hide the page-level search input; use the `q` query param instead
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const qParam = (searchParams.get('q') || '').trim().toLowerCase()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state for better UX
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [qParam])

  // subsequence match: check that every char in q appears in title (in order)
  function matchesByLetters(text, q) {
    if (!q) return true
    const s = text.toLowerCase()
    let pos = 0
    for (let i = 0; i < q.length; i++) {
      const ch = q[i]
      pos = s.indexOf(ch, pos)
      if (pos === -1) return false
      pos += 1
    }
    return true
  }

  // Highlight matched text
  function highlightText(text, q) {
    if (!q) return text
    
    try {
      // For substring matching
      if (text.toLowerCase().includes(q.toLowerCase())) {
        const regex = new RegExp(`(${q})`, 'gi')
        const parts = text.split(regex)
        
        return (
          <>
            {parts.map((part, i) => 
              regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
            )}
          </>
        )
      }
    } catch (e) {
      // Fallback if regex fails
      return text
    }
    
    return text
  }

  const results = qParam ? topics.filter(t => {
    // check Vietnamese title with subsequence matching
    if (matchesByLetters(t.title, qParam)) return true
    // fallback: preview or Vietnamese words contains substring
    if (t.preview.toLowerCase().includes(qParam)) return true
    return (t.wordsVi && t.wordsVi.some(w => w.toLowerCase().includes(qParam)))
  }) : topics

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-green-700">Tìm kiếm khóa học</h2>

      {/* Page-level search input hidden — use navbar search which sets ?q=... */}
      <div className="mt-4" aria-hidden>
        {/* intentionally left blank to avoid duplicate search box */}
      </div>

      <div className="mt-8 w-full max-w-4xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {qParam ? (
              <div>
                <p className="text-xl">Không tìm thấy kết quả cho "{qParam}"</p>
                <p className="mt-3">Vui lòng thử từ khóa khác hoặc xem tất cả khóa học.</p>
              </div>
            ) : (
              <p>Bạn có thể tìm kiếm theo tên bài học hoặc từ vựng</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((t) => (
              <div key={t.id} className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
                <img src={t.img} alt={t.title} className="w-full h-32 object-cover rounded" />
                <div className="mt-3 flex-1">
                  <div className="font-semibold text-lg">
                    {qParam ? highlightText(t.title, qParam) : t.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {qParam ? highlightText(t.preview, qParam) : t.preview}
                  </div>
                  {qParam && t.wordsVi && t.wordsVi.some(w => w.toLowerCase().includes(qParam)) && (
                    <div className="text-xs text-green-600 mt-2">
                      Từ khóa trong bài: {t.wordsVi.filter(w => w.toLowerCase().includes(qParam)).map(w => (
                        <span key={w} className="inline-block bg-green-50 border border-green-100 rounded px-1 mr-1">
                          {highlightText(w, qParam)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => navigate(`/lesson/${t.id}`)} 
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Học ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
