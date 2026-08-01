import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Clock, Flame, Gem, Trophy, ChevronDown } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
            }}
            animate={{ 
              y: [null, -30, 30],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/25 text-orange-300 text-sm font-bold mb-8 backdrop-blur-sm shadow-lg shadow-orange-500/5">
            <span className="text-lg">🇱🇰</span>
            <span>Sri Lanka's #1 Free Fire Top Up Store</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tight"
        >
          <span className="text-white drop-shadow-2xl">
            FREE FIRE
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
            TOP UP CENTER
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Sri Lanka's most trusted destination for Free Fire Diamonds & Memberships. 
          Instant delivery, secure payments, unbeatable prices.
        </motion.p>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {[
            { icon: Zap, text: "Instant Delivery" },
            { icon: Shield, text: "Secure Payments" },
            { icon: Clock, text: "24/7 Support" },
            { icon: Gem, text: "Best Prices" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
              <feature.icon className="w-4 h-4 text-orange-400" />
              <span>{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            href="https://wa.me/94740482490?text=🎮%20Hello%20LAKAFX%20TOP%20UP%20CENTER!%0A%0AI%20want%20to%20place%20a%20top-up%20order.%0A%0AGame:%20%0APlayer%20ID:%20%0APackage:%20"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/25 overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2.5">
              <Flame className="w-5 h-5" />
              Top Up Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          <motion.button
            onClick={() => scrollToSection('#packages')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-slate-600 text-slate-300 font-bold text-lg rounded-2xl hover:bg-slate-800/50 hover:border-orange-500/30 hover:text-orange-300 transition-all duration-300"
          >
            <span className="flex items-center gap-2.5">
              <Gem className="w-5 h-5" />
              View Packages
            </span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
        >
          {[
            { icon: Zap, label: 'Delivery Time', value: '0-5 Min', color: 'from-orange-500 to-amber-500', iconColor: 'text-orange-400' },
            { icon: Shield, label: 'Payment Security', value: '100% Safe', color: 'from-emerald-500 to-green-500', iconColor: 'text-emerald-400' },
            { icon: Clock, label: 'Customer Support', value: '24/7 Online', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs font-medium">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero