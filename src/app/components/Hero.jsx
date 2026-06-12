import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative h-screen flex items-end pb-24 overflow-hidden bg-[#080808]"
      style={{ minHeight: "100svh" }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1764013290175-2b76e9a00b2e?w=1800&h=1000&fit=crop&auto=format')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.3) 100%), linear-gradient(to top, rgba(10,10,10,0.8) 20%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <p
            className="font-display uppercase tracking-[0.3em] mb-4"
            style={{ fontSize: "0.7rem", color: "var(--primary)" }}
          >
            Experiencia Premium — Desde 2008
          </p>
          <h1
            className="font-display text-foreground leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700 }}
          >
            Conduce el
            <br />
            <span style={{ color: "var(--primary)" }}>Carro de</span>
            <br />
            tus Sueños
          </h1>
          <p
            className="text-muted-foreground mb-10 max-w-md leading-relaxed"
            style={{ fontSize: "1rem" }}
          >
            Más de 200 vehículos de lujo y alto rendimiento. Financiamiento flexible,
            garantía extendida y la mejor atención en Colombia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#modelos"
              className="inline-flex items-center px-8 py-3.5 font-display uppercase tracking-widest transition-all duration-200"
              style={{
                fontSize: "0.75rem",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Ver Modelos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center px-8 py-3.5 border border-white/30 text-foreground hover:border-primary hover:text-primary font-display uppercase tracking-widest transition-all duration-200"
              style={{ fontSize: "0.75rem" }}
            >
              Agendar Prueba
            </a>
          </div>
        </div>
      </div>

      <a
        href="#modelos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 z-10"
        aria-label="Scroll to models"
      >
        <span className="font-display uppercase tracking-widest" style={{ fontSize: "0.6rem" }}>
          Explorar
        </span>
        <ChevronDown size={16} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
