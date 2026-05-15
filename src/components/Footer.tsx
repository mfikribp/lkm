import React from 'react';
import { motion } from 'framer-motion';
import RollingText from './RollingText';
import ScrollReveal from './ScrollReveal';
import { members } from '../data/data';

import logoHmif from '../assets/logo-hima-if.png';
import logoIf25Putih from '../assets/logoif25-putih.png';
import logoLkmIf2 from '../assets/Logo LKM IF2.png';

const Footer: React.FC = () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Anggota', path: '/anggota' },
    { name: 'Materi', path: '/materi' },
    { name: 'SWOT', path: '/swot' },
  ];

  return (
    <footer className="relative bg-[#020617] text-slate-100 overflow-hidden pt-10 pb-10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img
          src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Marquee Section */}
      <div className="relative z-10 w-full mb-12 overflow-hidden py-6 border-y border-white/5 bg-white/[0.02]">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap items-center will-change-transform"
          >
            {/* First Set */}
            <div className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <div key={`set1-${i}`} className="flex items-center">
                  <span className="text-3xl font-black uppercase tracking-tighter text-blue-600">
                    KELOMPOK 19 - LKM INFORMATIKA 2026
                  </span>
                  <span className="text-3xl text-white/10 mx-12">•</span>
                </div>
              ))}
            </div>
            {/* Second Identical Set for Seamless Loop */}
            <div className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <div key={`set2-${i}`} className="flex items-center">
                  <span className="text-3xl font-black uppercase tracking-tighter text-blue-600">
                    KELOMPOK 19 - LKM INFORMATIKA 2026
                  </span>
                  <span className="text-3xl text-white/10 mx-12">•</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start mb-16">

          {/* Navigation Column */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[13px] uppercase tracking-widest text-slate-500 font-bold mb-4 text-center md:text-left">PAGES</span>
            <div className="flex flex-col items-center md:items-start gap-2">
              {pages.map((item) => (
                <ScrollReveal key={item.path}>
                  <RollingText
                    to={item.path}
                    text={item.name}
                    className="text-3xl font-black uppercase leading-none hover:text-blue-500 transition-colors text-center"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col items-center md:items-start lg:col-span-2">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <span className="text-[13px] uppercase tracking-widest text-slate-500 font-bold">CONNECT WITH US</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D4ED8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 w-full justify-items-center sm:justify-items-start">
              {members.map((member) => (
                <ScrollReveal key={member.id} width="fit-content">
                  <RollingText
                    href={member.linkedin}
                    text={member.name}
                    className="text-lg md:text-xl font-bold uppercase leading-tight hover:text-blue-500 transition-colors tracking-tight text-center sm:text-left"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Logo & Slogan Section */}
        <div className="flex flex-col items-center border-t border-white/5 pt-20">
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="shine-container p-2 rounded-xl"
            >
              <img
                src={logoIf25Putih}
                alt="IF25 Logo"
                draggable={false}
                className="h-16 md:h-24 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="shine-container p-2 rounded-xl"
            >
              <img
                src={logoLkmIf2}
                alt="LKM IF2 Logo"
                draggable={false}
                className="h-16 md:h-24 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="shine-container p-2 rounded-xl"
            >
              <img
                src={logoHmif}
                alt="HMIF Logo"
                draggable={false}
                className="h-16 md:h-24 w-auto object-contain"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <ScrollReveal revealColor="#1D4ED8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-100">
                INFORMATIKA!!!
              </h2>
            </ScrollReveal>
            
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight slogan-gradient text-center">
                SATU IDEOLOGI <br />
                SATU SOLIDARITAS
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-20 pt-10 border-t border-slate-800/50 flex flex-col items-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
            © 2026 KELOMPOK 19 • LKM INFORMATIKA • DESIGNED BY KELOMPOK 19
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
