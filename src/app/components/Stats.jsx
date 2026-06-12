const STATS = [
  { value: "200+", label: "Vehículos Disponibles" },
  { value: "16", label: "Años de Experiencia" },
  { value: "4.800+", label: "Clientes Satisfechos" },
  { value: "98%", label: "Índice de Satisfacción" },
];

export function Stats() {
  return (
    <section className="border-y border-border py-16" style={{ background: "var(--card)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center px-6">
              <span
                className="font-display"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--primary)" }}
              >
                {s.value}
              </span>
              <span
                className="text-muted-foreground mt-1 uppercase tracking-widest font-display"
                style={{ fontSize: "0.65rem" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
