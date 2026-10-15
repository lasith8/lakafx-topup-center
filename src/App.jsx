import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TopUpCards from "./components/TopUpCards";
import Reviews from "./components/Reviews";
import OrderForm from "./components/OrderForm";
import PaymentCard from "./components/PaymentCard";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SpecialOfferBanner from "./components/SpecialOfferBanner";
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Preloader from "./components/Preloader";

// අලුතින් එකතු කළ PlayerCheck Component එක
import PlayerCheck from "./components/PlayerCheck";

function Home() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <SpecialOfferBanner />
      <Hero />
      <Services />
      <TopUpCards />
      <Reviews />
      
      {/* Order එක දාන්න කලින් ID එක Check කරන කොටස මෙතනට දැම්මා */}
      <PlayerCheck />
      
      <OrderForm />
      <PaymentCard />
      <FAQ />
      <AboutUs />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}