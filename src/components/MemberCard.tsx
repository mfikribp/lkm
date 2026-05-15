import React, { useRef } from 'react';
import type { Member } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { IdCard, ChevronDown } from 'lucide-react';
import { useOutsideClick } from "../hooks/use-outside-click";

interface MemberCardProps {
  member: Member;
  isExpanded: boolean;
  onToggle: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isExpanded, onToggle }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useOutsideClick(ref, () => {
    if (isExpanded) onToggle();
  });

  return (
    // 1. Fixed Wrapper: Menjaga grid tetap stabil
    <div className="relative w-full h-[600px]">
      
      {/* 2. Absolute Overlay Card: Melayang di atas grid saat isOpen */}
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ 
          zIndex: isExpanded ? 50 : 1,
          scale: isExpanded ? 1.05 : 1, // Sedikit scale untuk efek premium
          height: isExpanded ? 'auto' : '600px',
        }}
        transition={{ 
          layout: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
        className={`absolute top-0 left-0 w-full glass-card flex flex-col overflow-hidden transition-shadow duration-300 ${
          isExpanded 
            ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/20 ring-1 ring-white/10' 
            : 'shadow-xl'
        }`}
      >
        {/* Gambar Bagian Atas */}
        <div className="relative overflow-hidden flex-shrink-0 cursor-pointer" onClick={onToggle}>
          <motion.img
            layout
            src={member.photo}
            alt={member.name}
            className={`w-full object-cover object-[center_15%] ${
              isExpanded ? 'h-[350px]' : 'h-[420px]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-transparent to-transparent" />
        </div>

        {/* Konten Utama */}
        <div className="p-6 flex flex-col flex-grow">
          <motion.div layout="position" className="flex-grow flex flex-col justify-between">
            <div>
              <motion.h2 
                layout="position"
                className={`${
                  isExpanded ? 'text-2xl' : 'text-lg lg:text-xl'
                } text-slate-100 tracking-tight uppercase font-black leading-tight mb-2`}
              >
                {member.name}
              </motion.h2>
              
              {!isExpanded && (
                <motion.button
                  layout="position"
                  onClick={onToggle}
                  className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors"
                >
                  <span>Selengkapnya</span>
                  <ChevronDown size={12} />
                </motion.button>
              )}
            </div>

            {/* 3. Smooth Collapse Animation: Dropdown menggunakan AnimatePresence */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    height: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 border-t border-white/10 pt-6 space-y-5">
                    <div className="space-y-4">
                      {member.nim && (
                        <div className="space-y-1">
                          <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest">NIM</p>
                          <span className="inline-flex items-center space-x-2 bg-blue-600/10 text-blue-400 px-3 py-1.5 rounded-sm border border-blue-500/20 uppercase text-[10px] font-black tracking-widest">
                            <IdCard size={12} />
                            <span>{member.nim}</span>
                          </span>
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest">Jabatan</p>
                        <p className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/5 rounded-sm text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center border border-white/10"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                      )}

                      <button
                        onClick={onToggle}
                        className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center space-x-2"
                      >
                        <ChevronDown size={12} className="rotate-180" />
                        <span>Tutup</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberCard;
