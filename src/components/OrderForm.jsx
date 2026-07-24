import { useState } from "react";
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
{ id: "520", name: "Diamond 520", price: "LKR 1635" },
{ id: "830", name: "Diamond 830", price: "LKR 2610" },
{ id: "1060", name: "Diamond 1060", price: "LKR 3215" },
{ id: "1580", name: "Diamond 1580", price: "LKR 4845" },
{ id: "2180", name: "Diamond 2180", price: "LKR 6490" },
{ id: "3240", name: "Diamond 3240", price: "LKR 9705" },
{ id: "5600", name: "Diamond 5600", price: "LKR 16070" },
{ id: "10060", name: "Diamond 10060", price: "LKR 29375" },
{ id: "11500", name: "Diamond 11500", price: "LKR 33100" },
{ id: "weekly", name: "Weekly", price: "LKR 555" },
{ id: "weekly-max", name: "Weekly Max", price: "LKR 670" },
{ id: "monthly", name: "Monthly", price: "LKR 2765" },
{ id: "vip", name: "VIP", price: "LKR 3315" },
{ id: "super-vip", name: "Super VIP", price: "LKR 4975" },
{ id: "super-vip-max", name: "Super VIP Max", price: "LKR 9950" },
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
    setTimeout(() => setAlert({ type: "", message: "" }), 5000);
  };

  const handlePackageChange = (e) => {
    setPackageName(e.target.value);
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
    const packageDisplayName = pkgObj ? pkgObj.name : orderData.package;

    const message = encodeURIComponent(
      `🎮 LAKAFX TOP UP CENTER\n\n` +
      `Game:\nFree Fire\n\n` +
      `Package:\n${packageDisplayName}\n\n` +
      `Player ID:\n${orderData.playerId}\n\n` +
      `Phone:\n${orderData.phone}\n\n` +
      `Payment Method:\n${PAYMENT_METHOD}\n\n` +
      `Payment Number:\n${PAYMENT_NUMBER}\n\n` +
      `Screenshot:\n${orderData.screenshot}`
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

      openWhatsApp({
        package: packageName,
        playerId: playerId.trim(),
        phone: phone.trim(),
        screenshot: screenshot,
      });

      resetForm();
    } catch (err) {
      console.error("Order error:", err);
      showAlert("error", "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="text-orange-300 text-sm font-medium">Free Fire Top Up</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mb-4">
            COMPLETE YOUR TOP UP
          </h2>
          <p className="text-orange-200/60 text-lg">
            Fill in your Player ID, upload the payment receipt and receive your diamonds within minutes.
          </p>
        </div>

        {alert.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${alert.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
            <span className="text-xl">{alert.type === "success" ? "✓" : "✕"}</span>
            <span className="font-medium">{alert.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl shadow-orange-500/5">
          
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl">
              🔥
            </div>
            <div>
              <h3 className="text-orange-100 font-bold text-lg">Free Fire</h3>
              <p className="text-orange-300/60 text-sm">Garena Free Fire Max</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <span className="text-green-400 text-xs font-medium">Instant Delivery</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wider">
              Select Diamond Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availablePackages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                    packageName === pkg.id
                      ? "bg-orange-500/20 border-orange-400 shadow-lg shadow-orange-500/10"
                      : "bg-slate-800/50 border-slate-700 hover:border-orange-500/40 hover:bg-slate-800/80"
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={packageName === pkg.id}
                    onChange={handlePackageChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${packageName === pkg.id ? "text-orange-100" : "text-slate-200"}`}>
                      {pkg.name}
                    </span>
                    <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                      packageName === pkg.id 
                        ? "bg-orange-500 text-white" 
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {pkg.price}
                    </span>
                  </div>
                  {packageName === pkg.id && (
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-orange-400"></div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-400 mb-2 uppercase tracking-wider">
              Player ID
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/60 text-lg pointer-events-none">🆔</span>
              <input
                type="text"
                value={playerId}
                onChange={handlePlayerIdChange}
                placeholder="Enter your Free Fire Player ID"
                className="w-full bg-slate-800/80 border border-orange-500/30 rounded-xl pl-11 pr-4 py-3 text-slate-50 placeholder-slate-400/30 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all hover:border-orange-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-400 mb-2 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/60 text-lg pointer-events-none">📱</span>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="07X XXX XXXX"
                className="w-full bg-slate-800/80 border border-orange-500/30 rounded-xl pl-11 pr-4 py-3 text-slate-50 placeholder-slate-400/30 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all hover:border-orange-500/50"
              />
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-orange-300 font-semibold">
              <span className="text-lg">💳</span>
              <span>eZ Cash Payment</span>
            </div>
            <div className="flex items-center gap-3 pl-6">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-lg">📲</span>
              </div>
              <div>
                <p className="text-slate-100 font-medium">{PAYMENT_METHOD}</p>
                <p className="text-slate-400 text-sm font-mono">{PAYMENT_NUMBER}</p>
              </div>
            </div>
          </div>

          <UploadScreenshot
            onUpload={handleUpload}
            onRemove={handleRemove}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 group"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">⚡</span>
                  <span>SComplete Order via WhatsApp</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;