import { useState } from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", interest: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate send delay
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: "", phone: "", email: "", message: "", interest: "" });
    }, 800);
  }

  return (
    <section id="contacto" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="font-display uppercase tracking-[0.3em] mb-3"
              style={{ fontSize: "0.7rem", color: "var(--primary)" }}
            >
              Estamos para servirte
            </p>
            <h2
              className="font-display text-foreground leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Agenda tu <br />Visita o Prueba
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12" style={{ fontSize: "0.95rem" }}>
              Nuestros asesores especializados están listos para ayudarte a encontrar el vehículo ideal.
              Sin compromisos, sin presiones.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-9 h-9 flex items-center justify-center border border-primary/30 flex-shrink-0"
                >
                  <MapPin size={15} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-display text-foreground" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Showroom Principal
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>
                    Carrera 15 #93-75, Zona Rosa<br />Bogotá, Colombia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <Phone size={15} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-display text-foreground" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Línea de Atención
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>
                    +57 (1) 743-8800<br />WhatsApp: +57 310 555-0192
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <Clock size={15} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="font-display text-foreground" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Horario de Atención
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>
                    Lun–Vie: 8:00 am – 7:00 pm<br />Sáb–Dom: 9:00 am – 5:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-8">
            {sent ? (
              <div className="text-center py-16">
                <div
                  className="w-14 h-14 mx-auto flex items-center justify-center border border-primary mb-6"
                  style={{ background: "var(--primary)" }}
                >
                  <Send size={20} style={{ color: "var(--primary-foreground)" }} />
                </div>
                <h3 className="font-display text-foreground mb-2" style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                  Un asesor se pondrá en contacto contigo en las próximas 2 horas.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 font-display uppercase tracking-widest border border-primary text-primary px-6 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  style={{ fontSize: "0.65rem" }}
                >
                  Nuevo Mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>
                      Nombre
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200"
                      style={{ fontSize: "0.9rem" }}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200"
                      style={{ fontSize: "0.9rem" }}
                      placeholder="+57 300 000 0000"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200"
                    style={{ fontSize: "0.9rem" }}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>
                    Vehículo de Interés
                  </label>
                  <input
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200"
                    style={{ fontSize: "0.9rem" }}
                    placeholder="Ej: Porsche 911, BMW M5..."
                  />
                </div>
                <div>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200 resize-none"
                    style={{ fontSize: "0.9rem" }}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-display uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.72rem" }}
                >
                  <Send size={14} className={loading ? "animate-pulse" : ""} />
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
