import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import RollingText from './RollingText';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const expandTimer = setTimeout(() => setIsExpanded(true), 2000);
    const retractTimer = setTimeout(() => setIsExpanded(false), 7000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(retractTimer);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (isOpen) return;
    if (current < 10) {
      setVisible(true);
    } else if (current > lastScrollY.current) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY.current = current;
  });

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Anggota', path: '/anggota' },
    { name: 'Materi', path: '/materi' },
    { name: 'SWOT', path: '/swot' },
  ];



  const showFullLogo = isExpanded || isHovered;

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as any;

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 inset-x-0 mx-auto z-[100] px-4 flex justify-center pointer-events-none"
      >
        <div className={`glass-card flex items-center justify-between w-full max-w-[800px] px-6 py-3 rounded-full pointer-events-auto shadow-2xl border border-white/10 transition-all duration-500 ${isOpen ? 'bg-white/5 border-white/5 shadow-none' : ''}`}>
          <Link
            to="/"
            className="flex items-center group cursor-pointer"
            onClick={() => setIsOpen(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                width: showFullLogo ? 'auto' : 0,
                opacity: showFullLogo ? 1 : 0,
                marginRight: showFullLogo ? 12 : 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-xl font-black tracking-tight text-slate-100">
                Kelompok
              </span>
            </motion.div>

            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-[10deg] transition-all duration-500 shrink-0">
              <span className="text-white text-xl font-black">19</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center px-7 py-3 rounded-full text-[15px] uppercase font-bold tracking-[0.1em] transition-all duration-300 select-none ${location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
              >
                <RollingText text={item.name} />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-100 bg-white/5 border border-white/10 overflow-hidden group"
            >
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[90] bg-[#020617] md:hidden flex flex-col pt-32 pb-12 px-8 overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-start space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <motion.div key={item.path} variants={itemVariants} className="relative flex items-center group">
                    {isActive ? (
                      <div
                        className="block text-6xl font-extrabold uppercase tracking-tighter transition-all duration-500 w-fit text-slate-400 cursor-default select-none relative z-10"
                      >
                        {item.name}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-6xl font-extrabold uppercase tracking-tighter transition-all duration-500 w-fit text-slate-100 hover:text-slate-400 hover:translate-x-4 cursor-pointer relative z-10"
                      >
                        {item.name}
                      </Link>
                    )}

                    {isActive && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        className="absolute left-0 right-0 top-[44%] -translate-y-1/2 h-8 text-blue-400 overflow-visible pointer-events-none z-20"
                      >
                        <svg
                          viewBox="0 0 100 20"
                          preserveAspectRatio="none"
                          className="w-full h-full fill-none stroke-current stroke-[1.8px]"
                        >
                          <path d="M0 10 L 15 10 C 20 10, 22 18, 30 18 L 45 18 C 53 18, 55 10, 60 10 L 75 10 C 80 10, 82 18, 90 18 L 100 18" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-auto flex justify-center border-t border-white/5 pt-8"
            >
              <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">© LKM 2026 - KELOMPOK 19</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
