import { useState } from "react";
import { motion } from "framer-motion";

const FREE_FIRE_PACKAGES = [
  {
    id: "25",
    name: "Diamond 25",
    price: "LKR 85",
    oldPrice: "",
    discount: "",
    popular: false,
    icon: "💎",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "50",
    name: "Diamond 50",
    price: "LKR 170",
    oldPrice: "LKR 175",
    discount: "LKR 5 OFF",
    popular: false,
    icon: "💎",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "100",
    name: "Diamond 100",
    price: "LKR 320",
    oldPrice: "LKR 340",
    discount: "LKR 20 OFF",
    popular: true,
    icon: "💎",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "310",
    name: "Diamond 310",
    price: "LKR 900",
    oldPrice: "LKR 950",
    discount: "LKR 50 OFF",
    popular: false,
    icon: "💎",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "520",
    name: "Diamond 520",
    price: "LKR 1,450",
    oldPrice: "LKR 1,550",
    discount: "LKR 100 OFF",
    popular: false,
    icon: "💎",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "1060",
    name: "Diamond 1,060",
    price: "LKR 2,900",
    oldPrice: "LKR 3,100",
    discount: "LKR 200 OFF",
    popular: true,
    icon: "💎",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "2180",
    name: "Diamond 2,180",
    price: "LKR 5,800",
    oldPrice: "LKR 6,200",
    discount: "LKR 400 OFF",
    popular: false,
    icon: "💎",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "5600",
    name: "Diamond 5,600",
    price: "LKR 14,500",
    oldPrice: "LKR 15,500",
    discount: "LKR 1,000 OFF",
    popular: true,
    icon: "💎",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "weekly",
    name: "Weekly Pass",
    price: "LKR 550",
    oldPrice: "LKR 600",
    discount: "LKR 50 OFF",
    popular: false,
    icon: "⚡",
    color: "from-emerald-500 to-teal-500",
    badge: "7 Days",
  },
  {
    id: "monthly",
    name: "Monthly Pass",
    price: "LKR 1,850",
    oldPrice: "LKR 2,000",
    discount: "LKR 150 OFF",
    popular: true,
    icon: "🔥",
    color: "from-orange-500 to-red-600",
    badge: "30 Days",
  },
  {
    id: "levelup",
    name: "Level Up Pass",
    price: "LKR 950",
    oldPrice: "LKR 1,000",
    discount: "LKR 50 OFF",
    popular: false,
    icon: "🚀",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "booyah",
    name: "Booyah Pass",
    price: "LKR 1,200",
    oldPrice: "LKR 1,300",
    discount: "LKR 100 OFF",
    popular: false,
    icon: "🏆",
    color: "from-yellow-500 to-amber-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const TopUpCards = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const scrollToOrder = (packageId) => {
    setSelectedPackage(packageId);
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      {/* Animated Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/25 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-lg shadow-orange-400/50"></span>
            <span className="text-orange-300 text-sm font-bold tracking-wide uppercase">Most Popular Packages</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 mb-6 drop-shadow-2xl">
            FREE FIRE TOP UP
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Instant diamond delivery at the <span className="text-orange-400 font-semibold">lowest prices</span> in Sri Lanka. Choose your package and get topped up in seconds.
          </p>
        </motion.div>

        {/* Game Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 bg-gradient-to-r from-orange-600/15 via-amber-600/15 to-orange-600/15 border border-orange-500/25 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-amber-500 flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/30 relative z-10"
          >
            🔥
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
          </motion.div>

          <div className="text-center md:text-left flex-1 relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-orange-100 mb-3">
              Garena Free Fire
            </h3>
            <p className="text-orange-200/50 mb-5 text-base">
              The ultimate battle royale experience. Top up diamonds now and dominate the battlefield!
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {[
                { icon: "⚡", text: "Instant Delivery", color: "green" },
                { icon: "🔒", text: "Secure Payment", color: "blue" },
                { icon: "⭐", text: "Best Prices", color: "purple" },
                { icon: "🎁", text: "Bonus Rewards", color: "amber" },
              ].map((badge, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 bg-${badge.color}-500/15 text-${badge.color}-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-${badge.color}-500/20 backdrop-blur-sm`}
                >
                  <span>{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block text-right relative z-10">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              12+
            </div>
            <div className="text-slate-500 text-sm font-medium">Packages</div>
            <div className="text-orange-400/60 text-xs mt-1">Starting LKR 85</div>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
        >
          {FREE_FIRE_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.25, ease: "easeOut" } }}
              onHoverStart={() => setHoveredPackage(pkg.id)}
              onHoverEnd={() => setHoveredPackage(null)}
              className={`relative group rounded-2xl border p-6 transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                selectedPackage === pkg.id
                  ? "bg-gradient-to-b from-orange-500/20 to-amber-500/10 border-orange-400/60 shadow-2xl shadow-orange-500/20 scale-[1.02]"
                  : "bg-slate-900/70 border-slate-700/40 hover:border-orange-500/40 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-orange-500/10"
              }`}
              onClick={() => scrollToOrder(pkg.id)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30 z-20 flex items-center gap-1"
                >
                  <span>🔥</span>
                  POPULAR
                </motion.div>
              )}

              {/* Discount Badge */}
              {pkg.discount && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg z-10 tracking-wide">
                  {pkg.discount}
                </div>
              )}

              {/* Duration Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 bg-slate-800/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/20 z-10">
                  {pkg.badge}
                </div>
              )}

              <div className="flex flex-col items-center text-center pt-4">
                {/* Icon Container */}
                <motion.div
                  animate={{
                    scale: hoveredPackage === pkg.id ? 1.15 : 1,
                    rotate: hoveredPackage === pkg.id ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-3xl mb-5 shadow-lg relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 drop-shadow-md">{pkg.icon}</span>
                </motion.div>

                {/* Name */}
                <h4 className={`text-lg font-black mb-2 transition-colors duration-300 ${
                  selectedPackage === pkg.id ? "text-orange-300" : "text-slate-100 group-hover:text-orange-200"
                }`}>
                  {pkg.name}
                </h4>

                {/* Price Section */}
                <div className="mb-5 w-full">
                  {pkg.discount && (
                    <div className="inline-flex items-center gap-1 bg-red-500/15 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded mb-2 border border-red-500/20">
                      SAVE {pkg.discount.replace(" OFF", "")}
                    </div>
                  )}
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-sm">
                    {pkg.price}
                  </div>
                  {pkg.oldPrice && (
                    <div className="text-slate-600 line-through text-sm font-medium mt-1">
                      {pkg.oldPrice}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="w-full space-y-2.5 mb-6">
                  {[
                    "Instant Delivery",
                    "24/7 Support",
                    "100% Secure",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-slate-400 text-xs">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-xl font-black text-sm transition-all duration-300 relative overflow-hidden ${
                    selectedPackage === pkg.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-orange-500/20"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {selectedPackage === pkg.id ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Selected
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        Buy Now
                      </>
                    )}
                  </span>
                  {selectedPackage === pkg.id && (
                    <motion.div
                      layoutId="selectedGlow"
                      className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20"
                    />
                  )}
                </motion.button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-amber-500/0 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", label: "Instant Delivery", desc: "Under 2 minutes", gradient: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20", text: "text-green-400" },
            { icon: "🔒", label: "100% Secure", desc: "Encrypted payments", gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20", text: "text-blue-400" },
            { icon: "💰", label: "Best Prices", desc: "Lowest in Sri Lanka", gradient: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20", text: "text-amber-400" },
            { icon: "🎧", label: "24/7 Support", desc: "Always here to help", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20", text: "text-purple-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-5 text-center backdrop-blur-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="text-3xl mb-3 drop-shadow-lg">{item.icon}</div>
              <div className={`${item.text} font-bold text-sm mb-1`}>{item.label}</div>
              <div className="text-slate-500 text-xs">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Need a custom package? Contact us on WhatsApp</p>
          <motion.a
            href="https://wa.me/94740482490"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-shadow"
          >
            <span>💬</span>
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TopUpCards;