'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Preloader de marca, exibido apenas na primeira carga da sessão.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('sensoria-preloaded');
    if (seen) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('sensoria-preloaded', '1');
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sensoria-green"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.span
            className="font-display text-5xl tracking-display text-sensoria-white md:text-7xl"
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.02em' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Sensória
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
