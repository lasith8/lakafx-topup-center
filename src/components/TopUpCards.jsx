import { useState } from "react";
import { motion } from "framer-motion";

const FREE_FIRE_PACKAGES = [
  {
    id: "ff-100",
    name: "100 Diamonds",
    price: "LKR 150",
    popular: false,
    icon: "💎",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "ff-310",
    name: "310 Diamonds",
    price: "LKR 450",
    popular: false,
    icon: "💎",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "ff-520",
    name: "520 Diamonds",
    price: "LKR 750",
    popular: false,
    icon: "💎",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "ff-1060",
    name: "1,060 Diamonds",
    price: "LKR 1,500",
    popular: true,
    icon: "💎",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "ff-2180",
    name: "2,180 Diamonds",
    price: "LKR 3,000",
    popular: false,
    icon: "💎",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "ff-5600",
    name: "5,600 Diamonds",
    price: "LKR 7,500",
    popular: false,
    icon: "💎",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "ff-weekly",
    name: "Weekly Pass",
    price: "LKR 550",
    popular: false,
    icon: "⚡",
    color: "from-green-500 to-emerald-400",
    badge: "7 Days",
  },
  {
    id: "ff-monthly",
    name: "Monthly Pass",
    price: "LKR 1,850",
    popular: true,
    icon: "🔥",
    color: "from-orange-500 to-red-500",
    badge: "30 Days",
  },
  {
    id: "ff-levelup",
    name: "Level Up Pass",
    price: "LKR 950",
    popular: false,
    icon: "🚀",
    color: "from-indigo-500 to-violet-400",
  },
  {
    id: "ff-booyah",
    name: "Booyah Pass",
    price: "LKR 1,200",
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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TopUpCards = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const scrollToOrder = (packageId) => {
    setSelectedPackage(packageId);
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="text-orange-300 text-sm font-semibold">Most Popular</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mb-4">
            FREE FIRE TOP UP
          </h2>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Instant diamond delivery. Choose your package and get topped up in seconds.
          </p>
        </motion.div>

        {/* Game Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-orange-600/20 border border-orange-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-5xl shadow-lg shadow-orange-500/20">
            🔥
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-orange-100 mb-2">
              Garena Free Fire
            </h3>
            <p className="text-orange-200/60 mb-3">
              The ultimate battle royale experience. Top up diamonds now!
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Instant Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                🔒 Secure Payment
              </span>
              <span className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ Best Prices
              </span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-3xl font-black text-orange-400">10+</div>
            <div className="text-slate-400 text-sm">Packages</div>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {FREE_FIRE_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative group rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                selectedPackage === pkg.id
                  ? "bg-orange-500/10 border-orange-400 shadow-xl shadow-orange-500/10"
                  : "bg-slate-900/60 border-slate-700/50 hover:border-orange-500/40 hover:bg-slate-800/60"
              }`}
              onClick={() => scrollToOrder(pkg.id)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  🔥 POPULAR
                </div>
              )}

              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-3 right-3 bg-slate-700/80 text-slate-300 text-xs font-medium px-2 py-0.5 rounded-md">
                  {pkg.badge}
                </div>
              )}

              <div className="flex flex-col items-center text-center pt-2">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {pkg.icon}
                </div>

                {/* Name */}
                <h4 className="text-slate-100 font-bold text-lg mb-1 group-hover:text-orange-300 transition-colors">
                  {pkg.name}
                </h4>

                {/* Price */}
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-4">
                  {pkg.price}
                </div>

                {/* Features */}
                <div className="w-full space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Instant Delivery
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 Support
                  </div>
                </div>

                {/* Button */}
                <button
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                      : "bg-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white"
                  }`}
                >
                  {selectedPackage === pkg.id ? "Selected ✓" : "Buy Now"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", label: "Instant Delivery", desc: "Under 2 minutes" },
            { icon: "🔒", label: "100% Secure", desc: "Safe transactions" },
            { icon: "💰", label: "Best Prices", desc: "Lowest in Sri Lanka" },
            { icon: "🎧", label: "24/7 Support", desc: "Always here to help" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-700/30 rounded-xl p-4 text-center hover:border-orange-500/20 transition-colors"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-slate-200 font-semibold text-sm">{item.label}</div>
              <div className="text-slate-500 text-xs">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopUpCards;