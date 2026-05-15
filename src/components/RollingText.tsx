import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface RollingTextProps {
  text: string;
  className?: string;
  to?: string;
  href?: string;
}

const RollingText: React.FC<RollingTextProps> = ({ text = '', className = '', to, href }) => {
  const characters = (text || '').split('');

  const containerClasses = `relative inline-block overflow-hidden cursor-pointer btn-rolling group/roll ${className}`;

  const content = (
    <motion.div
      className="relative flex whitespace-pre overflow-hidden"
      initial="initial"
      whileHover="hovered"
    >
      {characters.map((char, i) => (
        <div key={i} className="relative flex items-center overflow-hidden leading-none">
          {/* Top character */}
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' },
            }}
            transition={{
              duration: 0.4,
              ease: [0.215, 0.61, 0.355, 1],
              delay: i * 0.02,
            }}
            className="flex items-center"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          
          {/* Bottom character (incoming) */}
          <motion.span
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 },
            }}
            transition={{
              duration: 0.4,
              ease: [0.215, 0.61, 0.355, 1],
              delay: i * 0.02,
            }}
            className="absolute left-0 top-0 flex items-center h-full"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className={containerClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={containerClasses}>
        {content}
      </a>
    );
  }

  return <div className={containerClasses}>{content}</div>;
};

export default RollingText;
