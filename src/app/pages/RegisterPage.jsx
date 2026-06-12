import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendedor",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(form.name, form.email, form.password, form.role);
      setLoading(false);
      if (!result.ok) {
        setError(result.error || "Error al registrar.");
      } else {
        navigate("/login", { state: { registered: true } });
      }
    }, 600);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      <div className="hidden lg:flex flex-col justify-between p-12 w-[45%] relative overflow-hidden" style={{ background: "var(--card)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1764013290175-2b76e9a00b2e?w=900&h=1200&fit=crop&auto=format')" }} />
        <div className="relative z-10">
          <Link to="/" className="font-display tracking-[0.2em] uppercase" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>
            <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
          </Link>
        </div>
        <div className="relative z-10">
          <blockquote className="text-foreground leading-relaxed mb-4" style={{ fontSize: "1.3rem", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}>
            "La excelencia no es una habilidad,<br />es una actitud."
          </blockquote>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>— Ralph Marston</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <Link to="/" className="font-display tracking-[0.2em] uppercase" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>
              <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
            </Link>
          </div>

          <div className="mb-8">
            <p className="font-display uppercase tracking-[0.25em] mb-2" style={{ fontSize: "0.65rem", color: "var(--primary)" }}>Crear cuenta</p>
            <h1 className="font-display text-foreground" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>Únete al equipo</h1>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 border text-sm" style={{ borderColor: "#ef4444", color: "#ef4444", background: "rgba(239,68,68,0.08)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Nombre Completo</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200" placeholder="Juan Pérez" style={{ fontSize: "0.9rem" }} />
            </div>

            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Correo Electrónico</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200" placeholder="correo@ejemplo.com" style={{ fontSize: "0.9rem" }} />
            </div>

            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Rol</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200 appearance-none cursor-pointer" style={{ fontSize: "0.9rem" }}>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Contraseña</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 pr-12 outline-none focus:border-primary transition-colors duration-200" placeholder="Mínimo 6 caracteres" style={{ fontSize: "0.9rem" }} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-display uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>Confirmar Contraseña</label>
              <input type={showPass ? "text" : "password"} required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full bg-secondary border border-border text-foreground px-4 py-3 outline-none focus:border-primary transition-colors duration-200" placeholder="Repite tu contraseña" style={{ fontSize: "0.9rem" }} />
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 font-display uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.72rem" }}>
              <UserPlus size={15} />
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground" style={{ fontSize: "0.82rem" }}>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline font-display">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}