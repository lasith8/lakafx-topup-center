import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TopUpCards from "./components/TopUpCards";
import OrderForm from "./components/OrderForm";
import PaymentCard from "./components/PaymentCard";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      <ScrollToTop />
      <Navbar />

      <main>
        <Hero />

        <Services />

        <TopUpCards />

        {/* Order Form */}
        <OrderForm />

        {/* Payment Method */}
        <PaymentCard />

        <AboutUs />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
