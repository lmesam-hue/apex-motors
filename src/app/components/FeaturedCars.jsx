import { useState } from "react";
import { Fuel, Gauge, Zap } from "lucide-react";
import { useVehicles } from "../context/VehiclesContext";

const CATEGORIES = ["Todos", "Deportivos", "SUV", "Sedán", "Eléctrico", "Camioneta", "Convertible"];

const BADGE_COLORS= {
  Nuevo: "var(--primary)",
  Exclusivo: "#a855f7",
  Eléctrico: "#22c55e",
  Certificado: "#3b82f6",
  Reservado: "#f59e0b",
};

export function FeaturedCars() {
  const { vehicles } = useVehicles();
  const [active, setActive] = useState("Todos");

  const available = vehicles.filter((v) => v.status !== "vendido");
  const filtered = active === "Todos" ? available : available.filter((c) => c.category === active);

  return (
    <section id="modelos" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="font-display uppercase tracking-[0.3em] mb-3"
              style={{ fontSize: "0.7rem", color: "var(--primary)" }}
            >
              Inventario Disponible
            </p>
            <h2
              className="font-display text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Nuestros Modelos
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-1.5 font-display uppercase tracking-wider transition-all duration-200"
                style={{
                  fontSize: "0.65rem",
                  border: `1px solid ${active === cat ? "var(--primary)" : "rgba(255,255,255,0.12)"}`,
                  background: active === cat ? "var(--primary)" : "transparent",
                  color: active === cat ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
            No hay vehículos disponibles en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <article
                key={car.id}
                className="group bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-52 bg-[#141414]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="absolute top-3 left-3 font-display uppercase tracking-widest px-2.5 py-1"
                    style={{
                      fontSize: "0.6rem",
                      background: car.status === "reservado" ? BADGE_COLORS["Reservado"] : (BADGE_COLORS[car.badge] || "var(--primary)"),
                      color: "#0a0a0a",
                    }}
                  >
                    {car.status === "reservado" ? "Reservado" : car.badge}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                        {car.year} · {car.km === 0 ? "0 km" : `${car.km.toLocaleString()} km`}
                      </p>
                      <h3 className="font-display text-foreground mt-0.5" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                        {car.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>COP</p>
                      <p className="font-display" style={{ color: "var(--primary)", fontSize: "0.95rem", fontWeight: 600 }}>
                        ${car.price.toLocaleString("es-CO")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <span className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                      <Zap size={12} style={{ color: "var(--primary)" }} />
                      {car.hp} hp
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                      <Fuel size={12} style={{ color: "var(--primary)" }} />
                      {car.fuel}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                      <Gauge size={12} style={{ color: "var(--primary)" }} />
                      {car.transmission}
                    </span>
                  </div>

                  <button
                    className="mt-4 w-full py-2.5 border border-border text-muted-foreground hover:border-primary hover:text-primary font-display uppercase tracking-widest transition-all duration-200"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Ver Detalles
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
