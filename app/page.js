export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white scroll-smooth">

      {/* ✅ NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md transition-all duration-300 flex items-center justify-between px-10 md:px-16 py-4">
        {/* ✅ Logo */}
        <h1 className="text-3xl font-bold select-none">
          <span className="text-blue-600">Learn</span>
          <span className="text-black">Sphere</span>
        </h1>

        {/* ✅ Menu */}
        <div className="hidden md:flex gap-10 text-blue-600 font-medium text-lg">
          <a href="/" className="hover:text-black transition">Home</a>
          <a href="#about" className="hover:text-black transition">About Us</a>
          <a href="#trending" className="hover:text-black transition">Trending</a>
          <a href="#contact" className="hover:text-black transition">Contact Us</a>
        </div>

        {/* ✅ Button */}
        <div className="flex gap-3">
          <a
            href="/login"
            className="px-6 py-2 border border-black rounded-full hover:bg-gray-100 text-black transition"
          >
            LOGIN
          </a>
          <a
            href="/register"
            className="px-6 py-2 border border-black rounded-full hover:bg-gray-100 text-black transition"
          >
            REGISTER
          </a>
        </div>
      </nav>

      {/* ✅ HERO SECTION */}
      <section className="w-full min-h-[100vh] flex flex-col md:flex-row items-center justify-center px-8 md:px-16 pt-36 pb-20 gap-10 bg-gradient-to-b from-white to-blue-50">
        {/* ✅ LEFT TEXT */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 leading-tight drop-shadow-lg">
            Your Sphere of <br /> Knowledge <br /> Begins Here!
          </h1>

          <p className="text-gray-700 mt-6 text-lg leading-relaxed">
            LearnSphere Library menghadirkan pengalaman membaca modern — 
            mudah diakses, informatif, dan penuh inspirasi.
          </p>

          <a
            href="/login"
            className="inline-block mt-8 border text-blue-600 border-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            GET MORE
          </a>
        </div>

        {/* ✅ RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/karakter-perpus.jpg"
            alt="Library Illustration"
            className="w-full max-w-[600px] md:max-w-[680px] object-contain drop-shadow-lg"
          />
        </div>
      </section>

      {/* ✅ ABOUT SECTION */}
      <section id="about" className="py-20 px-8 md:px-12 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600">About Library</h2>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
            LearnSphere Library hadir sebagai tempat membaca digital modern
            yang menyediakan ribuan buku, koleksi pengetahuan, dan sumber
            edukasi berkualitas untuk mendukung proses belajar sepanjang hayat.
          </p>
        </div>
      </section>

      {/* ✅ BOOK CATEGORY */}
      <section id="category" className="py-20 px-8 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          Book Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-12">
          {[
            "Teknologi",
            "Sejarah",
            "Psikologi",
            "Pemrograman",
            "Bisnis",
            "Sains",
            "Fiksi",
            "Sastra",
          ].map((item, i) => (
            <div
              key={i}
              className="border p-6 rounded-2xl bg-white text-center shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <p className="text-xl font-semibold text-black">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ POPULAR BOOKS */}
 {/* ✅ POPULAR BOOKS */}
<section id="trending" className="py-20 px-8 md:px-12 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold text-blue-600 text-center">
    Popular Books
  </h2>

  <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {[
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          category: "Programming",
          img: "/5-cm.jpg",
        },
        {
          id: 2,
          title: "Atomic Habits",
          author: "James Clear",
          category: "Self Development",
          img: "/ayat-ayat-cinta.jpg",
        },
        {
          id: 3,
          title: "The Psychology of Money",
          author: "Morgan Housel",
          category: "Finance",
          img: "/the-psychology-of-money.jpg",
        },
        

      ].map((book) => (
        <div
          key={book.id}
          className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-4 flex flex-col items-center text-center"
        >
          <div className="w-full h-56 flex items-center justify-center mb-4 bg-gray-50 rounded-xl">
            <img
              src={book.img || "/placeholder-book.png"}
              alt={book.title}
              className="max-h-full object-contain rounded-lg"
            />
          </div>

          <h3 className="text-xl font-semibold text-blue-600 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-700 text-sm mt-1">
            Penulis: {book.author}
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Kategori: {book.category}
          </p>

          <a
            href="/register"
            className="mt-auto inline-block border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition text-sm font-medium"
          >
            Lihat Detail
          </a>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ✅ TESTIMONIAL */}
      <section id="testimonial" className="py-20 px-8 md:px-12 bg-gray-100">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          What Our Readers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
          {[
            {
              name: "Andi",
              desc: "Banyak banget pilihan bukunya! Membantu saya belajar coding.",
            },
            {
              name: "Bunga",
              desc: "UI webnya rapi dan enak dipakai. Suka banget!",
            },
            {
              name: "Dewi",
              desc: "Buku yang saya cari banyak tersedia. Keren!",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border p-6 rounded-2xl bg-white text-center shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <p className="text-gray-700 italic leading-relaxed">
                "{item.desc}"
              </p>
              <p className="mt-4 text-lg font-semibold text-black">
                - {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer id="contact" className="bg-slate-100 py-12 sm:px-10 px-6 tracking-wide border-t border-gray-300">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900">Newsletter</h2>
            <p className="text-sm mt-4 text-slate-600 leading-relaxed">
              Tetap terhubung dengan LearnSphere!  
              Dapatkan informasi terbaru tentang buku populer, event literasi, dan promo menarik lainnya.
            </p>

            <div className="bg-gray-200 flex px-2 py-1.5 rounded-full text-left mt-8">
              <input
                type="email"
                placeholder="Masukkan email kamu..."
                className="w-full outline-none bg-transparent text-sm pl-4"
              />
              <button
                type="button"
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm rounded-full px-4 py-2.5 ml-4 transition-all tracking-wide cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>

          <hr className="my-12 border-gray-300" />

          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Tentang LearnSphere",
                items: [
                  "LearnSphere adalah platform perpustakaan digital yang menyediakan ribuan koleksi buku dan sumber belajar untuk mendukung proses pendidikan modern.",
                ],
              },
              {
                title: "Layanan",
                items: [
                  "Peminjaman Buku",
                  "Baca Online",
                  "E-Learning",
                  "Konsultasi Akademik",
                ],
              },
              {
                title: "Koleksi",
                items: [
                  "Buku Pelajaran",
                  "Literatur Umum",
                  "Majalah Digital",
                  "Buku Fiksi",
                ],
              },
              {
                title: "Informasi",
                items: [
                  "Tentang Kami",
                  "Visi & Misi",
                  "Tim Pengelola",
                  "Testimoni Pengguna",
                ],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-base font-semibold mb-6 text-slate-900">
                  {col.title}
                </h4>
                {col.items.length === 1 ? (
                  <p className="text-slate-600 mb-2 text-sm leading-relaxed">
                    {col.items[0]}
                  </p>
                ) : (
                  <ul className="space-y-4 text-sm text-slate-600">
                    {col.items.map((item, j) => (
                      <li key={j} className="hover:text-slate-900 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
