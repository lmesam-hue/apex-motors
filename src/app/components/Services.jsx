import { ShieldCheck, CreditCard, RefreshCw, Wrench } from "lucide-react";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Garantía Extendida",
    desc: "Todos nuestros vehículos certificados cuentan con garantía de hasta 3 años. Revisión multípunto de 150 puntos antes de cada venta.",
  },
  {
    icon: CreditCard,
    title: "Financiamiento Flexible",
    desc: "Créditos desde el 0.6% mensual con cuotas hasta 84 meses. Aprobación en 24 horas con los principales bancos del país.",
  },
  {
    icon: RefreshCw,
    title: "Recibe tu Usado",
    desc: "Trae tu vehículo actual y recibe una tasación justa en menos de 30 minutos. Lo aceptamos como cuota inicial.",
  },
  {
    icon: Wrench,
    title: "Servicio Post-Venta",
    desc: "Taller especializado con técnicos certificados, repuestos originales y atención prioritaria para nuestros clientes.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-lg mb-16">
          <p
            className="font-display uppercase tracking-[0.3em] mb-3"
            style={{ fontSize: "0.7rem", color: "var(--primary)" }}
          >
            Lo que nos diferencia
          </p>
          <h2
            className="font-display text-foreground leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Servicios <br />
            de Clase Mundial
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-background p-10 group hover:bg-card transition-colors duration-300"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300"
                  style={{ borderRadius: 0 }}
                >
                  <Icon size={18} style={{ color: "var(--primary)" }} />
                </div>
                <h3
                  className="font-display text-foreground mb-3"
                  style={{ fontSize: "1.1rem", fontWeight: 600 }}
                >
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.9rem" }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
