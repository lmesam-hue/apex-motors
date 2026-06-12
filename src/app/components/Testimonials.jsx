import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Andrés Martínez",
    city: "Bogotá",
    car: "BMW M5 Competition",
    text: "La experiencia fue impecable de principio a fin. El equipo me asesoró perfectamente, sin presiones. El proceso de crédito fue rapidísimo y el carro llegó en condiciones perfectas.",
    stars: 5,
  },
  {
    name: "Valentina Ospina",
    city: "Medellín",
    car: "Porsche Cayenne GTS",
    text: "Llevé mi Range Rover de tasa, me dieron un precio justo y salí manejando mi Cayenne el mismo día. Servicio de primer nivel, definitivamente recomendado.",
    stars: 5,
  },
  {
    name: "Carlos Jiménez",
    city: "Cali",
    car: "Tesla Model S Plaid",
    text: "Me guiaron perfectamente en todo el proceso de cambiarme a eléctrico. Instalaron el cargador en mi casa y la garantía me da total tranquilidad. Apex Motors es diferente.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-28" style={{ background: "var(--card)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="font-display uppercase tracking-[0.3em] mb-3"
            style={{ fontSize: "0.7rem", color: "var(--primary)" }}
          >
            Clientes Satisfechos
          </p>
          <h2
            className="font-display text-foreground leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Lo que dicen <br />nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-background border border-border p-8">
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={13} fill="var(--primary)" style={{ color: "var(--primary)" }} />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-8" style={{ fontSize: "0.9rem" }}>
                "{t.text}"
              </p>
              <div className="border-t border-border pt-5">
                <p className="font-display text-foreground" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  {t.name}
                </p>
                <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.75rem" }}>
                  {t.city} · {t.car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
