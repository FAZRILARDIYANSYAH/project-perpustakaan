// "use client";
// import { Bell } from "lucide-react";
// import Image from "next/image";

// export default function Topbar({ toggleSidebar, isOpen }) {
//   return (
//     <header
//       className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6 transition-all duration-300 z-30 ${
//         isOpen ? "left-64" : "left-20"
//       }`}
//     >
//       {/* Tombol toggle sidebar */}
//       <button
//         onClick={toggleSidebar}
//         className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition shadow-sm"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={22}
//           height={22}
//           viewBox="0 0 24 24"
//         >
//           <path
//             fill="none"
//             stroke="#fff"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M3 10h12M3 6h18M3 14h18M3 18h12"
//           ></path>
//         </svg>
//       </button>

//       {/* Bagian kanan */}
//       <div className="flex items-center gap-6">
//         {/* Notifikasi */}
//         <button className="relative p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition shadow-sm">
//           <Bell size={18} className="text-white" />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-300 rounded-full"></span>
//         </button>

//         {/* Profil */}
//         <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-full transition">
//           <Image
//             src="/5-cm.jpg"
//             alt="User"
//             width={34}
//             height={34}
//             className="rounded-full border border-gray-300"
//           />
//           <span className="font-semibold text-blue-700 text-sm">Jiegle</span>
//         </div>
//       </div>
//     </header>
//   );
// }
