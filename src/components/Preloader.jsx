// src/components/Preloader.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/30">
              🔥
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-3xl border-2 border-dashed border-orange-500/30"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 mb-2"
          >
            LAKAFX
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-sm font-medium mb-8 tracking-widest uppercase"
          >
            TOP UP CENTER
          </motion.p>

          {/* Loading Bar */}
          <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-600 text-xs font-medium"
          >
            {progress < 100 ? "Loading..." : "Ready!"}
          </motion.p>

          {/* Percentage */}
          <p className="text-slate-700 text-xs mt-2 font-mono">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;