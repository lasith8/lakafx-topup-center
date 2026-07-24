import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
  { icon: Award, value: '99.9%', label: 'Success Rate' },
  { icon: TrendingUp, value: '4.9/5', label: 'Customer Rating' },
]

const AboutUs = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-neon-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Your Trusted <span className="neon-text">Gaming Partner</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                LAKAFX TOP UP CENTER is a leading digital gaming top-up platform dedicated to providing 
                fast, secure, and affordable services for gamers worldwide.
              </p>
              <p>
                Since our establishment, we have served over 10,000 satisfied customers across 50+ countries. 
                Our mission is to make gaming top-ups accessible, affordable, and hassle-free for everyone.
              </p>
              <p>
                We partner directly with game publishers to ensure legitimate and instant delivery of 
                diamonds, UC, CP, and other in-game currencies. Your account security is our top priority.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/94740482490"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Start Top Up
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-8 text-center hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <div className="font-display text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
