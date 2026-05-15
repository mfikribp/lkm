import React, { useState, useMemo } from 'react';
import { materials } from '../data/data';
import MaterialCard from '../components/MaterialCard';
import { motion, AnimatePresence } from 'framer-motion';

const Materi: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'latest'>('all');

  const displayedMaterials = useMemo(() => {
    const list = [...materials];
    if (filter === 'latest') {
      return list.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
    }
    return list; // 'all' returns original order (or could be sorted by id)
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-impact-lg text-slate-100"
          >
            Materi <span className="text-blue-500">LKM Informatika</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 mt-3 max-w-xl font-bold uppercase text-[11px] tracking-widest"
          >
            Kumpulan materi Latihan Kepemimpinan Mahasiswa Informatika 2026.
          </motion.p>
        </div>
        <div className="flex bg-white/[0.03] p-1 rounded-full border border-white/5 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-8 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest transition-all duration-300 ${filter === 'all'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-100'
              }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter('latest')}
            className={`px-8 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest transition-all duration-300 ${filter === 'latest'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-100'
              }`}
          >
            Terbaru
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {displayedMaterials.map((material) => (
            <motion.div
              key={material.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <MaterialCard material={material} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Materi;
