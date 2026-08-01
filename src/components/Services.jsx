import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gamepad2, CreditCard, HeadphonesIcon, Gift, TrendingDown, Clock } from 'lucide-react'

const services = [
  {
    icon: Gamepad2,
    title: 'Game Top Up',
    description: 'Instant top-up for Free Fire, PUBG, Mobile Legends, CODM and more popular games.',
    color: 'from-neon-blue to-accent-blue',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Multiple payment options with bank-grade encryption for safe transactions.',
    color: 'from-neon-purple to-accent-purple',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support via WhatsApp, ready to assist you anytime.',
    color: 'from-neon-pink to-accent-pink',
  },
  {
    icon: Gift,
    title: 'Bonus Rewards',
    description: 'Get exclusive bonus diamonds, UC, and CP on select top-up packages.',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: TrendingDown,
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts and promotional offers.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Most orders completed within 0-5 minutes. No waiting, no hassle.',
    color: 'from-neon-cyan to-blue-500',
  },
]

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-8 hover:shadow-card-hover transition-all duration-500 group gradient-border"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <service.icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  )
}

const Services = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Why Choose <span className="neon-text">LAKAFX</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We provide the best gaming top-up experience with unbeatable speed, security, and customer service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
