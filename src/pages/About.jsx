export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="bg-gradient-to-r from-green-50 to-white rounded-xl p-8 shadow-md grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700">Chào mừng đến với English Journey</h1>
          <p className="mt-4 text-gray-700">Chào bạn! 👋<br/>Chào mừng đến với English Journey – người bạn đồng hành giúp bạn chinh phục tiếng Anh mỗi ngày.</p>

          <p className="mt-4 text-gray-700">Chúng tôi hiểu rằng việc học tiếng Anh đôi khi có thể khiến bạn thấy khó khăn, chán nản hoặc không biết bắt đầu từ đâu. Vì thế,   được tạo ra để biến việc học trở nên nhẹ nhàng, vui vẻ và hiệu quả hơn bao giờ hết.</p>

          <div className="mt-6">
            <a href="/signup" className="inline-block bg-green-600 text-white px-5 py-2 rounded-md shadow hover:bg-green-700">Tạo tài khoản</a>
            <a href="/mylearn" className="ml-3 text-green-700 underline">Xem My Learn</a>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60" alt="illustration" className="w-full max-w-md rounded-lg shadow-lg object-cover" />
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">🌟 Sứ mệnh của chúng tôi</h2>
          <p className="mt-3 text-gray-700">Mang đến cho mọi người một cách học tiếng Anh đơn giản, gần gũi và phù hợp với cuộc sống hằng ngày. Dù bạn là học sinh, sinh viên hay người đi làm bận rộn, chỉ cần vài phút mỗi ngày, bạn vẫn có thể tiến bộ rõ rệt.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">📘 English Journey giúp bạn điều gì?</h2>
          <ul className="mt-3 space-y-3 text-gray-700">
            <li>💬 Luyện nghe & nói qua hội thoại thực tế, giúp bạn tự tin giao tiếp hơn.</li>
            <li>🧩 Học từ vựng bằng flashcards sinh động, dễ nhớ, dễ áp dụng.</li>
            <li>✍️ Ôn ngữ pháp & làm bài tập với phần giải thích rõ ràng, dễ hiểu.</li>
            <li>📊 Theo dõi tiến độ học tập trong mục My Learn để thấy bạn đang tiến bộ mỗi ngày.</li>
            <li>🤖 Trò chuyện với AI để luyện phản xạ tiếng Anh tự nhiên, không ngại sai.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">💡 Chúng tôi tin rằng...</h2>
        <p className="mt-3 text-gray-700">Học tiếng Anh không cần quá áp lực — chỉ cần bạn bắt đầu từ hôm nay, kiên trì từng bước nhỏ. Mỗi bài học là một hành trình, và chúng tôi luôn ở đây để cùng bạn đi đến cuối con đường. 🌈</p>

        <p className="mt-4 text-gray-700">❤️ Hãy bắt đầu hành trình của bạn! Tạo tài khoản, chọn chủ đề bạn yêu thích và bắt đầu ngay hôm nay. English Journey sẽ giúp bạn học tiếng Anh mỗi ngày một cách tự nhiên, vui vẻ và đầy cảm hứng!</p>

        <blockquote className="mt-4 p-4 bg-green-50 border-l-4 border-green-200 text-green-700 rounded">“Learn English the easy way – one small step at a time.” 🌱</blockquote>
      </section>
    </main>
  )
}

