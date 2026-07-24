import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Clock } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse-slow" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Trusted by 10,000+ Gamers Worldwide
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Level Up Your</span>
          <br />
          <span className="neon-text">Gaming Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fast, secure, and affordable top-up services for Free Fire, PUBG, Mobile Legends, and CODM. 
          Instant delivery, 24/7 support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
  href="https://wa.me/94740482490?text=🎮%20Hello%20LAKAFX%20TOP%20UP%20CENTER!%0A%0AI%20want%20to%20place%20a%20top-up%20order.%0A%0AGame:%20%0APlayer%20ID:%20%0APackage:%20"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary flex items-center gap-2 text-lg"
>
  Top Up Now
  <ArrowRight className="w-5 h-5" />
</a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            View Services
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: Zap, label: 'Instant Delivery', value: '0-5 Min' },
            { icon: Shield, label: 'Secure Payment', value: '100% Safe' },
            { icon: Clock, label: 'Support', value: '24/7 Online' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 flex flex-col items-center gap-3 hover:border-neon-blue/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-neon-blue" />
              <span className="text-2xl font-bold font-display text-white">{stat.value}</span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-neon-blue rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
