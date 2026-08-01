import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock, Shield } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+(94)0740482490',
    href: 'https://wa.me/0740482490',
    color: 'text-green-400',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'support@lakafx.com',
    href: 'mailto:support@lakafx.com',
    color: 'text-neon-blue',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Global Service - Online 24/7',
    href: null,
    color: 'text-neon-purple',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: '24/7 - Always Online',
    href: null,
    color: 'text-neon-pink',
  },
]

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-dark-800/50">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-pink font-semibold text-sm tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Contact <span className="neon-text">Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? Need help with your order? Our team is available 24/7 to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="text-white font-semibold mb-1">{info.label}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 animate-float">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Order via WhatsApp
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The fastest way to place your order. Send us your game ID and desired package, 
              and we will process it instantly.
            </p>
            
            <div className="space-y-4 w-full max-w-sm">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-neon-green" />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
