import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { materials } from '../data/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const MateriDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const material = materials.find((m) => m.id === id);
  const otherMaterials = materials.filter(m => m.id !== id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (otherMaterials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % otherMaterials.length);
  };

  const handlePrev = () => {
    if (otherMaterials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + otherMaterials.length) % otherMaterials.length);
  };

  // Get items to display (handle wrap-around for 2 items)
  const displayMaterials = otherMaterials.length > 0 ? [
    otherMaterials[currentIndex],
    otherMaterials[(currentIndex + 1) % otherMaterials.length]
  ] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!material) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Materi tidak ditemukan</h2>
        <button
          onClick={() => navigate('/materi')}
          className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
        >
          Kembali ke Materi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/materi')}
        className="flex items-center space-x-2 text-slate-400 hover:text-blue-500 transition-colors mb-8 group uppercase text-[10px] font-black tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Daftar Materi</span>
      </motion.button>

      <article>
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-4"
          >
            <div className="px-3 py-1 bg-white/5 text-blue-500 text-[10px] font-bold rounded-[3px] border border-white/10 uppercase tracking-widest">
              Kaderisasi
            </div>
            <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Calendar size={14} className="mr-2" />
              {material.date ? new Date(material.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal tidak tersedia'}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-100 mb-6 uppercase font-black tracking-tight leading-[1.1] text-5xl"
          >
            {material.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 border-l-2 border-blue-600 pl-6 py-2 font-medium"
          >
            {material.description}
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 md:p-12 rounded-[3px]"
        >
          <div className="prose prose-invert max-w-none">
            {material.content ? (
              material.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-[#dde1d2] leading-relaxed mb-6 font-medium">
                  {paragraph}
                </p>
              ))
            ) : (
              <div className="flex flex-col items-center py-12 text-[#b4b8a5]">
                <BookOpen size={48} className="mb-4 opacity-20" />
                <p className="uppercase text-[10px] font-black tracking-widest">Konten materi sedang dalam proses penyusunan.</p>
              </div>
            )}
          </div>


        </motion.div>
      </article>

      <section className="mt-20 border-t border-white/5 pt-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-slate-100 uppercase font-black tracking-tighter text-3xl">Materi Lainnya</h2>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Eksplorasi wawasan kaderisasi lainnya</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 hover:bg-blue-600/20 rounded-full border border-white/10 text-slate-400 hover:text-blue-400 transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white/5 hover:bg-blue-600/20 rounded-full border border-white/10 text-slate-400 hover:text-blue-400 transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {displayMaterials.map((other) => (
                <Link
                  key={other.id}
                  to={`/materi/${other.id}`}
                  className="glass-card p-8 rounded-[3px] group hover:border-blue-500/50 transition-all relative overflow-hidden h-[250px] flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 group-hover:h-full transition-all duration-500" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/60 bg-blue-500/5 px-2 py-1 rounded">
                      ID: {other.id}
                    </span>
                    <ArrowRight size={14} className="text-slate-700 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
                  </div>

                  <h4 className="text-xl font-black uppercase tracking-tight text-slate-100 group-hover:text-blue-500 transition-colors mb-3">
                    {other.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2 font-medium leading-relaxed mb-4">
                    {other.description}
                  </p>
                  
                  <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Calendar size={12} className="mr-2" />
                    {other.date ? new Date(other.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'N/A'}
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default MateriDetail;
