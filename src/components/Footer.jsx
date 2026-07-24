import { Zap, Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-neon-blue">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-wider">
                <span className="text-neon-blue">LAKA</span>
                <span className="text-white">FX</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Your trusted gaming top-up partner. Fast, secure, and affordable services for all popular mobile games. 
              Join thousands of satisfied gamers worldwide.
            </p>
            <div className="flex gap-4">
              {['Free Fire', 'PUBG', 'Mobile Legends', 'CODM'].map((game) => (
                <span
                  key={game}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                >
                  {game}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Top Up', href: '#topup' },
                { name: 'About Us', href: '#about' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href="mailto:support@lakafx.com" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                  Email Us
                </a>
              </li>
              <li>
                <span className="text-gray-400">24/7 Online</span>
              </li>
              <li>
                <span className="text-gray-400">Instant Delivery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © 2026 LAKAFX TOP UP CENTER. Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> for gamers.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-neon-blue hover:shadow-neon-blue/60 transition-all duration-300 hover:scale-110 z-40"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </footer>
  )
}

export default Footer
