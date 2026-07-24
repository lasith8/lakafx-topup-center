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

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Services />

        <TopUpCards />

        <Reviews />

        <OrderForm />

        <PaymentCard />

        <AboutUs />

        <Contact />
      </main>

      <Footer />

      <ScrollToTop />
    </>
  );
}

export default App;