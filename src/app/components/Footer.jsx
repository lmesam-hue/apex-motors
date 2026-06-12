import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--card)" }} className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <p className="font-display tracking-[0.2em] uppercase mb-4" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-sm" style={{ fontSize: "0.85rem" }}>
              La mejor selección de vehículos de lujo y alto rendimiento en Colombia.
              16 años ofreciendo experiencias de compra incomparables.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display uppercase tracking-[0.2em] text-foreground mb-5" style={{ fontSize: "0.65rem" }}>
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {["Modelos", "Servicios", "Financiamiento", "Nosotros", "Blog", "Contacto"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    style={{ fontSize: "0.82rem" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display uppercase tracking-[0.2em] text-foreground mb-5" style={{ fontSize: "0.65rem" }}>
              Marcas
            </p>
            <ul className="flex flex-col gap-3">
              {["Porsche", "BMW", "Mercedes-Benz", "Lamborghini", "Ferrari", "Tesla"].map((b) => (
                <li key={b}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    style={{ fontSize: "0.82rem" }}
                  >
                    {b}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
            © 2024 Apex Motors. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Política de Privacidad", "Términos y Condiciones"].map((l) => (
              <a key={l} href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" style={{ fontSize: "0.72rem" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
