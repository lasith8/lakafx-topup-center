import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Package,
  User,
  Phone,
  CreditCard,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Shield,
  Zap,
  Clock,
} from "lucide-react";
import UploadScreenshot from "./UploadScreenshot";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

const GAMES = [
  { id: "free-fire", name: "Free Fire" },
];

const PACKAGES = {
  "free-fire": [
    { id: "25", name: "Diamond 25", price: "LKR 85" },
    { id: "50", name: "Diamond 50", price: "LKR 170" },
    { id: "100", name: "Diamond 100", price: "LKR 320" },
    { id: "200", name: "Diamond 200", price: "LKR 645" },
    { id: "310", name: "Diamond 310", price: "LKR 980" },
    { id: "520", name: "Diamond 520", price: "LKR 1,635" },
    { id: "830", name: "Diamond 830", price: "LKR 2,610" },
    { id: "1060", name: "Diamond 1,060", price: "LKR 3,215" },
    { id: "1580", name: "Diamond 1,580", price: "LKR 4,845" },
    { id: "2180", name: "Diamond 2,180", price: "LKR 6,490" },
    { id: "3240", name: "Diamond 3,240", price: "LKR 9,705" },
    { id: "5600", name: "Diamond 5,600", price: "LKR 16,070" },
    { id: "10060", name: "Diamond 10,060", price: "LKR 29,375" },
    { id: "11500", name: "Diamond 11,500", price: "LKR 33,100" },
    { id: "weekly", name: "Weekly", price: "LKR 555" },
    { id: "weekly-max", name: "Weekly Max", price: "LKR 670" },
    { id: "monthly", name: "Monthly", price: "LKR 2,765" },
    { id: "vip", name: "VIP", price: "LKR 3,315" },
    { id: "super-vip", name: "Super VIP", price: "LKR 4,975" },
    { id: "super-vip-max", name: "Super VIP Max", price: "LKR 9,950" },
  ],
};

const PAYMENT_METHOD = "eZ Cash";
const PAYMENT_NUMBER = "0740482490";
const WHATSAPP_NUMBER = "94740482490";

const OrderForm = () => {
  const [game, setGame] = useState("free-fire");
  const [packageName, setPackageName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [phone, setPhone] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const availablePackages = PACKAGES["free-fire"];

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 6000);
  };

  const handlePackageChange = (pkgId) => {
    setPackageName(pkgId);
  };

  const handlePlayerIdChange = (e) => {
    setPlayerId(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpload = (imageUrl) => {
    setScreenshot(imageUrl);
  };

  const handleRemove = () => {
    setScreenshot("");
  };

  const validateForm = () => {
    if (!packageName) return "Please select a package.";
    if (!playerId.trim()) return "Please enter your Player ID.";
    if (!phone.trim()) return "Please enter your phone number.";
    if (!/^(07|\+947)\d{8}$/.test(phone.trim().replace(/\s/g, ""))) {
      return "Please enter a valid Sri Lankan phone number (07X XXX XXXX).";
    }
    if (!screenshot) return "Please upload the payment screenshot.";
    return null;
  };

  const saveOrderToFirestore = async (orderData) => {
    await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
  };

  const openWhatsApp = (orderData) => {
    const pkgObj = availablePackages.find((p) => p.id === orderData.package);
    const packageDisplayName = pkgObj ? `${pkgObj.name} — ${pkgObj.price}` : orderData.package;

    const message = encodeURIComponent(
      `🎮 *LAKAFX TOP UP CENTER*\n\n` +
      `*Game:*\nFree Fire\n\n` +
      `*Package:*\n${packageDisplayName}\n\n` +
      `*Player ID:*\n${orderData.playerId}\n\n` +
      `*Phone:*\n${orderData.phone}\n\n` +
      `*Payment Method:*\n${PAYMENT_METHOD}\n\n` +
      `*Payment Number:*\n${PAYMENT_NUMBER}\n\n` +
      `*Screenshot:*\n${orderData.screenshot}\n\n` +
      `✅ Order placed successfully!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const resetForm = () => {
    setPackageName("");
    setPlayerId("");
    setPhone("");
    setScreenshot("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      showAlert("error", error);
      return;
    }

    setIsSubmitting(true);
    setAlert({ type: "", message: "" });

    try {
      const pkgObj = availablePackages.find((p) => p.id === packageName);
      const packageDisplayName = pkgObj ? `${pkgObj.name} — ${pkgObj.price}` : packageName;

      const orderData = {
        game: "Free Fire",
        package: packageDisplayName,
        playerId: playerId.trim(),
        phone: phone.trim(),
        paymentMethod: PAYMENT_METHOD,
        paymentNumber: PAYMENT_NUMBER,
        screenshot: screenshot,
      };

      await saveOrderToFirestore(orderData);

      showAlert("success", "Order placed successfully! Opening WhatsApp...");

      setTimeout(() => {
        openWhatsApp({
          package: packageName,
          playerId: playerId.trim(),
          phone: phone.trim(),
          screenshot: screenshot,
        });
      }, 1000);

      resetForm();
    } catch (err) {
      console.error("Order error:", err);
      showAlert("error", "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/25 rounded-full px-5 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-bold tracking-wide uppercase">Quick & Easy</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 mb-4">
            COMPLETE YOUR TOP UP
          </h2>

          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Fill in your details, upload the payment receipt and receive your diamonds within minutes.
          </p>
        </motion.div>

        {/* Alert Messages */}
        <AnimatePresence>
          {alert.message && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 border backdrop-blur-sm ${
                alert.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {alert.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="font-medium text-sm">{alert.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-orange-500/5"
        >
          {/* Game Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/20 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20 relative z-10">
              🔥
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-orange-100 font-bold text-lg">Free Fire</h3>
              <p className="text-orange-300/50 text-sm">Garena Free Fire Max</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs font-semibold">Instant Delivery</span>
              </div>
            </div>
            <div className="hidden sm:block text-right relative z-10">
              <div className="text-xs text-slate-500">Server</div>
              <div className="text-sm font-bold text-orange-300">Online</div>
            </div>
          </motion.div>

          {/* Package Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-orange-400 mb-4 uppercase tracking-wider">
              <Package className="w-4 h-4" />
              Select Diamond Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {availablePackages.map((pkg) => (
                <motion.label
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                    packageName === pkg.id
                      ? "bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-orange-400 shadow-lg shadow-orange-500/10"
                      : "bg-slate-800/50 border-slate-700/50 hover:border-orange-500/30 hover:bg-slate-800/70"
                  }`}
                  onClick={() => handlePackageChange(pkg.id)}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={packageName === pkg.id}
                    onChange={() => handlePackageChange(pkg.id)}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        packageName === pkg.id
                          ? "bg-orange-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}>
                        💎
                      </div>
                      <span className={`font-semibold text-sm ${packageName === pkg.id ? "text-orange-100" : "text-slate-200"}`}>
                        {pkg.name}
                      </span>
                    </div>
                    <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${
                      packageName === pkg.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {pkg.price}
                    </span>
                  </div>
                  {packageName === pkg.id && (
                    <motion.div
                      layoutId="packageIndicator"
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-400"
                    />
                  )}
                </motion.label>
              ))}
            </div>
          </div>

          {/* Player ID */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-orange-400 mb-3 uppercase tracking-wider">
              <User className="w-4 h-4" />
              Player ID
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400/60 group-focus-within:text-orange-400 transition-colors pointer-events-none" />
              <input
                type="text"
                value={playerId}
                onChange={handlePlayerIdChange}
                placeholder="Enter your Free Fire Player ID"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all hover:border-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-orange-400 mb-3 uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400/60 group-focus-within:text-orange-400 transition-colors pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="07X XXX XXXX"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all hover:border-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Payment Info */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/15 rounded-xl p-5 space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-full" />
            <div className="flex items-center gap-2 text-green-400 font-bold relative z-10">
              <CreditCard className="w-4 h-4" />
              <span>eZ Cash Payment</span>
              <Shield className="w-3.5 h-3.5 ml-auto text-green-500/60" />
            </div>
            <div className="flex items-center gap-4 pl-6 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center border border-green-500/20">
                <Smartphone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-sm">{PAYMENT_METHOD}</p>
                <p className="text-slate-500 text-sm font-mono tracking-wider">{PAYMENT_NUMBER}</p>
              </div>
            </div>
          </motion.div>

          {/* Screenshot Upload */}
          <UploadScreenshot
            onUpload={handleUpload}
            onRemove={handleRemove}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 group"
          >
            <div className="relative z-10 flex items-center justify-center gap-2.5">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Complete Order via WhatsApp</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-2">
            {[
              { icon: Shield, text: "Secure" },
              { icon: Clock, text: "Fast" },
              { icon: Zap, text: "Instant" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-slate-500 text-xs">
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
};

export default OrderForm;