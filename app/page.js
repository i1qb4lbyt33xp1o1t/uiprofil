"use client";
import { UserCircle } from "lucide-react";

// Data Kelas & Kawan Terbaik
const classes = [
  {
    name: "Kelas SI",
    friends: ["Andi", "Budi", "Citra", "Dewi", "Eko"],
  },
  {
    name: "Kelas KA",
    friends: ["Fajar", "Gina", "Hadi", "Indah", "Joko"],
  },
  {
    name: "Kelas BD",
    friends: ["Kiki", "Lina", "Miko", "Nina", "Oscar"],
  },
];

// Komponen Card Kelas
const ClassCard = ({ classData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-11/12 md:w-4/5 mx-auto border-4 border-white transition-transform duration-300 hover:scale-105">
      {/* Header Card */}
      <h2 className="text-xl md:text-2xl font-bold text-center text-blue-600">
        {classData.name}
      </h2>

      {/* Ikon Profil Teman */}
      <div className="flex justify-center gap-4 md:gap-6 mt-6 flex-wrap">
        {classData.friends.map((friend, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/5 aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden transition-transform duration-300 hover:scale-110 bg-gray-200 p-2"
          >
            <UserCircle className="text-gray-500 w-16 h-16 md:w-20 md:h-20" />
            <p className="text-sm md:text-lg font-medium mt-2 text-center">{friend}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Halaman Utama
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
      {/* Judul dengan posisi yang rapi */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-6 md:mt-12 mb-6 md:mb-8 text-center">
        🎓 Manage Profil Kelas
      </h1>

      {/* Card ke bawah, responsif di semua layar */}
      <div className="flex flex-col gap-6 md:gap-8 w-full max-w-lg md:max-w-4xl">
        {classes.map((classData, index) => (
          <ClassCard key={index} classData={classData} />
        ))}
      </div>
    </div>
  );
}
