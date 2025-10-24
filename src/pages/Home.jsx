export default function Home() {
  const topics = [
    { id: 'animals', title: 'Động vật', desc: 'Học tên các loài động vật và ví dụ câu', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=60' },
    { id: 'food', title: 'Thực phẩm', desc: 'Từ vựng về đồ ăn và nấu ăn', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60' },
    { id: 'travel', title: 'Du lịch', desc: 'Từ vựng hữu ích khi đi du lịch', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60' },
  ]

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="bg-white rounded-lg p-8 shadow-sm grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 leading-tight">Chào mừng đến với English Journey — Học từ tiếng Anh dễ dàng!</h1>
          <p className="mt-4 text-gray-700">Luyện từ vựng theo chủ đề, theo dõi tiến độ và kiểm tra kiến thức mỗi ngày.</p>

          <div className="mt-6">
            <a href="/mylearn" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Bắt đầu học</a>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60" alt="Ảnh minh họa" className="w-full max-w-md rounded-xl shadow-lg object-cover" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Các chủ đề nổi bật</h2>
        <div className="space-y-6">
          {topics.map((t) => (
            <article key={t.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl duration-200">
              <img src={t.img} alt={t.title} className="w-full md:w-1/3 h-48 object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x450?text=No+image' }} />
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold">{t.title}</h3>
                <p className="text-gray-600 mt-2">{t.desc}</p>
                <div className="mt-4">
                  <a href={`/lesson/${t.id}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Học ngay</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
