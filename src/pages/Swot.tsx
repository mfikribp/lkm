import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, Zap, Shield, X, Lightbulb } from 'lucide-react';

interface SwotPoint {
  head: string;
  desc: string;
}

interface SwotSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  dotColor: string;
  description: string;
  points: SwotPoint[];
  solution: string;
}

const Swot: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SwotSection | null>(null);

  useEffect(() => {
    if (selectedSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSection]);

  const swotData: SwotSection[] = [
    {
      title: 'Strengths',
      icon: <Zap className="text-yellow-500" size={32} />,
      color: 'border-yellow-500/20',
      bgColor: 'bg-yellow-500/5',
      dotColor: 'bg-yellow-500',
      description: 'Kekuatan internal yang menjadi pondasi utama angkatan.',
      points: [
        {
          head: 'Solidaritas Berbasis Respect',
          desc: 'Angkatan memiliki fondasi hubungan yang kuat di mana setiap anggota merasa dihargai. Hal ini menciptakan lingkungan yang suportif dan meminimalkan konflik personal.'
        },
        {
          head: 'Kuantitas & Kolektivitas',
          desc: 'Dengan jumlah anggota yang banyak, angkatan memiliki tenaga yang besar untuk menjalankan program kerja atau mendukung satu sama lain dalam urusan akademik.'
        },
        {
          head: 'Kekompakan yang Teruji',
          desc: 'Adanya rasa memiliki yang tinggi membuat angkatan ini mudah untuk disatukan ketika menghadapi tantangan bersama.'
        }
      ],
      solution: 'Membentuk "Sistem Mentor Sebaya". Gunakan jumlah anggota yang banyak ini untuk saling berbagi ilmu. Anggota yang lebih mahir di satu bidang bisa membantu yang lain, sehingga kekuatan "banyak orang" ini berubah menjadi peningkatan kualitas akademik secara massal.'
    },
    {
      title: 'Weaknesses',
      icon: <Shield className="text-blue-500" size={32} />,
      color: 'border-blue-500/20',
      bgColor: 'bg-blue-500/5',
      dotColor: 'bg-blue-500',
      description: 'Area yang perlu diperbaiki untuk efisiensi organisasi.',
      points: [
        {
          head: 'Hambatan Distribusi Informasi',
          desc: 'Skala anggota yang besar seringkali menyebabkan informasi tidak tersebar secara merata atau terjadi distorsi pesan saat sampai ke anggota paling ujung.'
        },
        {
          head: 'Sentralisasi Partisipasi',
          desc: 'Ada kecenderungan ketergantungan pada figur tertentu, sehingga anggota lainnya menjadi pasif atau hanya menjadi pengikut.'
        },
        {
          head: 'Kesulitan Koordinasi',
          desc: 'Menyatukan jadwal dan pemikiran 200 orang merupakan tantangan logistik yang cukup berat.'
        }
      ],
      solution: 'Implementasikan Protokol Komunikasi Satu Pintu. Gunakan satu platform resmi (misal WhatsApp Community atau Discord) yang terbagi dalam kanal-kanal khusus agar informasi penting tidak tertimbun obrolan santai, sehingga miskomunikasi bisa ditekan.'
    },
    {
      title: 'Opportunities',
      icon: <TrendingUp className="text-green-500" size={32} />,
      color: 'border-green-500/20',
      bgColor: 'bg-green-500/5',
      dotColor: 'bg-green-500',
      description: 'Peluang eksternal yang bisa dimanfaatkan untuk berkembang.',
      points: [
        {
          head: 'Eksplorasi Bakat yang Luas',
          desc: 'Banyaknya potensi tersembunyi (bakat seni, olahraga, hingga teknologi) yang bisa dikembangkan menjadi prestasi kolektif angkatan.'
        },
        {
          head: 'Membangun Reputasi Angkatan',
          desc: 'Peluang untuk dikenal sebagai angkatan yang paling aktif dan kolaboratif, yang akan memudahkan akses ke jaringan alumni atau organisasi kampus lainnya.'
        },
        {
          head: 'Kolaborasi Multidisiplin Internal',
          desc: 'Dengan keberagaman minat anggota, angkatan bisa menciptakan proyek atau karya yang lebih kaya dan inovatif.'
        }
      ],
      solution: 'Membuat "Mapping Minat & Bakat". Data semua kemampuan yang dimiliki anggota, lalu buatkan wadah kecil (sub-komunitas) agar mereka bisa berkembang bersama dan siap ketika ada kesempatan lomba atau proyek membawa nama angkatan.'
    },
    {
      title: 'Threats',
      icon: <AlertTriangle className="text-red-500" size={32} />,
      color: 'border-red-500/20',
      bgColor: 'bg-red-500/5',
      dotColor: 'bg-red-500',
      description: 'Tantangan eksternal yang harus diwaspadai.',
      points: [
        {
          head: 'Disinformasi & Salah Instruksi',
          desc: 'Potensi kegagalan dalam menjalankan tugas akibat perbedaan interpretasi terhadap perintah dari luar (jurusan/senior).'
        },
        {
          head: 'Terbentuknya Kubu-Kubu (Klik)',
          desc: 'Risiko pecahnya kekompakan jika muncul kelompok-kelompok kecil yang terlalu eksklusif dan menutup diri dari anggota lain.'
        },
        {
          head: 'Penurunan Moral Akademik',
          desc: 'Tekanan tugas yang tinggi secara bersamaan dapat membuat anggota menjadi apatis terhadap kegiatan angkatan.'
        }
      ],
      solution: 'Terapkan Sistem Verifikasi Berlapis. Setiap instruksi penting wajib dikonfirmasi ulang secara tertulis kepada pemberi perintah sebelum disebarkan. Selain itu, adakan pertemuan rutin yang bersifat santai untuk mencairkan suasana antar kelompok agar tidak muncul sekat sosial.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-impact-lg text-slate-100"
        >
          SWOT <span className="text-blue-500">Analysis</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase text-[11px] tracking-[0.2em]"
        >
          Analisis Strategis Angkatan Informatika 2025 (LKM 2026).
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {swotData.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedSection(section)}
            className={`p-8 rounded-3xl border ${section.color} ${section.bgColor} backdrop-blur-sm relative overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-500`}
          >
            {/* Background Icon Watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 group-hover:scale-125 transform">
              {React.cloneElement(section.icon as any, { size: 200 })}
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-100">
                  {section.title}
                </h2>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-white/20 group-hover:text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                Klik Detail
              </motion.div>
            </div>

            <ul className="space-y-4 relative z-10">
              {section.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (i * 0.05) }}
                  className="flex items-start space-x-3 text-slate-300 group/item"
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${section.dotColor} group-hover/item:scale-150 transition-transform`} />
                  <span className="font-bold uppercase text-[12px] tracking-wide leading-relaxed">
                    {point.head}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedSection && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSection(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border ${selectedSection.color} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col`}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                <button
                  onClick={() => setSelectedSection(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors backdrop-blur-md"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 shrink-0">
                    {React.cloneElement(selectedSection.icon as any, { size: 24 })}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-100">
                      {selectedSection.title}
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      {selectedSection.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    {selectedSection.points.map((point, i) => (
                      <div key={i} className="group">
                        <h3 className={`text-[11px] md:text-sm font-bold uppercase tracking-wider mb-2 ${selectedSection.title === 'Strengths' ? 'text-yellow-500' : selectedSection.title === 'Weaknesses' ? 'text-blue-500' : selectedSection.title === 'Opportunities' ? 'text-green-500' : 'text-red-500'}`}>
                          {point.head}
                        </h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                          {point.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 md:pt-8 border-t border-white/5">
                    <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                      <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                        <Lightbulb size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">
                          Solusi (Optimalisasi)
                        </h4>
                        <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-semibold italic">
                          "{selectedSection.solution}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Swot;
