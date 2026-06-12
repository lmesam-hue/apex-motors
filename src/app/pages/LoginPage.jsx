import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const registered = location.state?.registered;

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (!result.ok) {
        setError(result.error || "Error al iniciar sesión.");
      } else {
        navigate("/");
      }
    }, 600);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      <div className="hidden lg:flex flex-col justify-between p-12 w-[45%] relative overflow-hidden" style={{ background: "var(--card)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628519592419-bf288f08cef5?w=900&h=1200&fit=crop&auto=format')" }} />
        <div className="relative z-10">
          <Link to="/" className="font-display tracking-[0.2em] uppercase" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>
            <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
          </Link>
        </div>
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              { value: "200+", label: "Vehículos" },
              { value: "16", label: "Años" },
              { value: "4.800+", label: "Clientes" },
              { value: "98%", label: "Satisfacción" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--primary)" }}>{s.value}</p>
                <p className="text-muted-foreground uppercase tracking-widest font-display" style={{ fontSize: "0.6rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <Link to="/" className="font-display tracking-[0.2em] uppercase" style={{ fontSize: "1rem", fontWeight: 700 }}>
              <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
            </Link>
          </div>
          <div className="mb-8">
            <p className="font-display uppercase tracking-[0.25em] mb-2" style={{ fontSize: "0.65rem", color: "var(--primary)" }}>Bienvenido de vuelta</p>
            <h1 className="font-display text-foreground" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>Inicia Sesión</h1>
          </div>

          {registered && (
            <div className="mb-6 px-4 py-3 border" style={{ borderColor: "#22c55e", color: "#22c55e", background: "rgba(34,197,94,0.08)", fontSize: "0.85rem" }}>
              Cuenta creada exitosamente. Inicia sesión para continuar.
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3 border" style={{ borderColor: "#ef4444", color: "#ef4444", background: "rgba(239,68,68,0.08)", fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Correo Electrónico</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200" placeholder="correo@ejemplo.com" style={{ fontSize: "0.9rem" }} autoComplete="email" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-display uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.6rem" }}>Contraseña</label>
              </div>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 pr-12 outline-none focus:border-primary transition-colors duration-200" placeholder="Tu contraseña" style={{ fontSize: "0.9rem" }} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 font-display uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.72rem" }}>
              <LogIn size={15} />
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground" style={{ fontSize: "0.82rem" }}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-primary hover:underline font-display">Regístrate aquí</Link>
          </p>

          <div className="mt-8 p-4 border border-border" style={{ background: "var(--card)" }}>
            <p className="font-display uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.58rem" }}>Demo rápido — crea una cuenta primero o usa:</p>
            <button type="button" onClick={() => setForm({ email: "admin@apexmotors.co", password: "apex2024" })} className="text-primary hover:underline" style={{ fontSize: "0.78rem" }}>
              admin@apexmotors.co / apex2024
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
