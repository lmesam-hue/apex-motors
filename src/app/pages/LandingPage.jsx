import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { FeaturedCars } from "../components/FeaturedCars";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background" style={{ scrollBehavior: "smooth" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring font-display uppercase tracking-widest"
        style={{ fontSize: "0.75rem" }}
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <FeaturedCars />
        <Services />
        <section id="testimonios">
          <Testimonials />
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
