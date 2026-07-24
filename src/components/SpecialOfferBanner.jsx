import { motion } from "framer-motion";

const SpecialOfferBanner = () => {
  return (
    <section className="relative overflow-hidden py-5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="whitespace-nowrap text-white font-bold text-lg tracking-wide"
      >
        🔥 WEEKLY PASS OFFER • FREE FIRE TOP UP • FAST DELIVERY • 24/7 SUPPORT •
        BEST PRICE IN SRI LANKA • SECURE PAYMENT • INSTANT DIAMONDS • 🔥
      </motion.div>
    </section>
  );
};

export default SpecialOfferBanner;