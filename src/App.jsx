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
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen />

      <Navbar />

      <main>
        <Hero />

        <SpecialOfferBanner />

        <Services />

        <TopUpCards />

        <Reviews />

        <OrderForm />

        <PaymentCard />

        <FAQ />

        <AboutUs />

        <Contact />
      </main>

      <Footer />

      <FloatingWhatsApp />

      <ScrollToTop />
    </>
  );
}

export default App;