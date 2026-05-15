import React, { useState, useEffect } from 'react';
import { members } from '../data/data';
import MemberCard from '../components/MemberCard';
import { motion, AnimatePresence } from 'framer-motion';
import { IdCard, ChevronDown } from 'lucide-react';

const Anggota: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 min-h-screen relative">
      <div className="text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-impact-lg text-slate-100"
        >
          <span className="text-blue-500">Struktur</span> Kelompok
        </motion.h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member) => (
          <div 
            key={member.id} 
            className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] transition-all duration-300 ${expandedId === member.id ? 'z-[50] relative' : 'z-10'}`}
          >
            <MemberCard 
              member={member} 
              isExpanded={expandedId === member.id}
              onToggle={() => setExpandedId(expandedId === member.id ? null : member.id)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            className="fixed inset-0 z-[40] bg-black/60 backdrop-blur-md cursor-zoom-out"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Anggota;
