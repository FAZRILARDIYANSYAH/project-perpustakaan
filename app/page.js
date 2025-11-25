import { BookOpen, Users, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white scroll-smooth">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/20 shadow-xl transition-all duration-300 flex items-center justify-between px-10 md:px-16 py-5 border-b border-blue-100">
        {/* Logo */}
        <h1 className="text-3xl font-bold select-none">
          <span className="text-blue-600">Learn</span>
          <span className="text-gray-900">Sphere</span>
        </h1>

        {/* Menu */}
        <div className="hidden md:flex gap-10 text-gray-700 font-semibold text-base">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
          <a href="#trending" className="hover:text-blue-600 transition-colors">Trending</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a>
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <a
            href="/auth/login"
            className="px-6 py-2.5 border-2 border-blue-600 rounded-full hover:bg-blue-50 text-blue-600 transition-all font-semibold hover:scale-105 hover:shadow-lg"
          >
            LOGIN
          </a>
          <a
            href="/auth/register"
            className="px-6 py-2.5 bg-blue-600 rounded-full hover:bg-blue-700 text-white transition-all font-semibold hover:scale-105 hover:shadow-xl"
          >
            REGISTER
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full min-h-[100vh] flex flex-col md:flex-row items-center justify-center px-8 md:px-16 pt-36 pb-20 gap-10 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* LEFT TEXT */}
        <div className="max-w-xl text-center md:text-left relative z-10">
          <div className="inline-block bg-blue-100 px-5 py-2 rounded-full shadow-lg mb-6 border border-blue-200">
            <span className="text-sm font-semibold text-blue-600">🚀 Digital Library Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 text-blue-600 drop-shadow-lg">
            Your Sphere of Knowledge <br /> Begins Here!
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            LearnSphere Library menghadirkan pengalaman membaca modern — 
            mudah diakses, informatif, dan penuh inspirasi.
          </p>

          <a
            href="/auth/login"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
          >
            GET STARTED →
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img
              src="/karakter-perpus.jpg"
              alt="Library Illustration"
              className="relative w-full max-w-[600px] md:max-w-[680px] object-contain drop-shadow-2xl rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-8 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-6">
            <span className="text-sm font-bold text-blue-600">TENTANG KAMI</span>
          </div>
          
          <h2 className="text-5xl font-extrabold text-blue-600 mb-6">
            About Library
          </h2>
          
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            LearnSphere Library hadir sebagai tempat membaca digital modern
            yang menyediakan ribuan buku, koleksi pengetahuan, dan sumber
            edukasi berkualitas untuk mendukung proses belajar sepanjang hayat.
          </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { num: "10,000+", label: "Koleksi Buku", icon: <BookOpen className="w-12 h-12 text-blue-600 mb-4" /> },
                { num: "5,000+", label: "Pengguna Aktif", icon: <Users className="w-12 h-12 text-blue-600 mb-4" /> },
                { num: "50+", label: "Kategori", icon: <Layers className="w-12 h-12 text-blue-600 mb-4" /> }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg border border-blue-200 hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center"
                >
                  {stat.icon}

                  <p className="text-5xl font-extrabold text-blue-600 mb-2 text-center">
                    {stat.num}
                  </p>
                  <p className="text-gray-700 font-semibold text-center">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

        </div>
      </section>

      {/* BOOK CATEGORY */}
      <section id="category" className="py-24 px-8 md:px-12 max-w-7xl mx-auto bg-gradient-to-b from-white to-blue-50">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-6">
            <span className="text-sm font-bold text-blue-600">KATEGORI</span>
          </div>
          
          <h2 className="text-5xl font-extrabold text-blue-600">
            Book Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: "Teknologi", icon: "💻" },
            { name: "Sejarah", icon: "📜" },
            { name: "Psikologi", icon: "🧠" },
            { name: "Pemrograman", icon: "⚡" },
            { name: "Bisnis", icon: "💼" },
            { name: "Sains", icon: "🔬" },
            { name: "Fiksi", icon: "📖" },
            { name: "Sastra", icon: "✍️" },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white border-2 border-gray-200 p-8 rounded-3xl text-center shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-blue-300 cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR BOOKS */}
      <section id="trending" className="py-24 px-8 md:px-12 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-6">
            <span className="text-sm font-bold text-blue-600">TRENDING</span>
          </div>
          
          <h2 className="text-5xl font-extrabold text-blue-600">
            Popular Books
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              id: 1,
              title: "5 CM",
              author: "Fazril",
              category: "Petualangan",
              img: "/cover/5-cm.jpg",
            },
            {
              id: 2,
              title: "Ayat Ayat Cinta",
              author: "James Clear",
              category: "Self Development",
              img: "/cover/ayat-ayat-cinta.jpg",
            },
            {
              id: 3,
              title: "The Psychology of Money",
              author: "Morgan Housel",
              category: "Finance",
              img: "/cover/the-psychology-of-money.jpg",
            },
          ].map((book) => (
            <div
              key={book.id}
              className="group bg-white border-2 border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition-all p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:border-blue-300"
            >
              <div className="w-full h-64 flex items-center justify-center mb-5 bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={book.img || "/placeholder-book.png"}
                  alt={book.title}
                  className="max-h-full object-contain rounded-lg"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Penulis:</span> {book.author}
              </p>
              <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                {book.category}
              </div>

              <a
                href="/auth/register"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Lihat Detail →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="testimonial" className="py-24 px-8 md:px-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 px-6 py-2 rounded-full mb-6">
              <span className="text-sm font-bold text-blue-600">TESTIMONI</span>
            </div>
            
            <h2 className="text-5xl font-extrabold text-blue-600">
              What Our Readers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex items-center">
            {[
              {
                name: "Andi",
                desc: "Banyak banget pilihan bukunya! Membantu saya belajar coding.",
                avatar: ""
              },
              {
                name: "Bunga",
                desc: "UI webnya rapi dan enak dipakai. Suka banget!",
                avatar: ""
              },
              {
                name: "Dewi",
                desc: "Buku yang saya cari banyak tersedia. Keren!",
                avatar: ""
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-200 p-8 rounded-3xl text-center shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-blue-300"
              >
                <div className="text-5xl mb-4">{item.avatar}</div>
                <p className="text-gray-700 italic leading-relaxed text-lg mb-4">
                  "{item.desc}"
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-900 py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Newsletter</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Tetap terhubung dengan LearnSphere!  
              Dapatkan informasi terbaru tentang buku populer, event literasi, dan promo menarik lainnya.
            </p>

            <div className="bg-gray-800 flex px-3 py-2 rounded-full text-left mt-8 border border-gray-700">
              <input
                type="email"
                placeholder="Masukkan email kamu..."
                className="w-full outline-none bg-transparent text-sm pl-4 text-white placeholder-gray-400"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full px-6 py-3 transition-all"
              >
                Submit
              </button>
            </div>
          </div>

          <hr className="my-12 border-gray-700" />

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
                <h4 className="text-lg font-bold mb-6 text-white">
                  {col.title}
                </h4>
                {col.items.length === 1 ? (
                  <p className="text-gray-400 mb-2 text-sm leading-relaxed">
                    {col.items[0]}
                  </p>
                ) : (
                  <ul className="space-y-3 text-sm text-gray-400">
                    {col.items.map((item, j) => (
                      <li key={j} className="hover:text-white cursor-pointer transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 LearnSphere Library. All rights reserved. Made with 💙
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
