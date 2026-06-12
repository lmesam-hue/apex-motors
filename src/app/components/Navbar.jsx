import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const links = ["Modelos", "Servicios", "Testimonios", "Contacto"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/8" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-foreground tracking-[0.2em] uppercase" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
                style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 font-display uppercase tracking-widest"
                style={{ fontSize: "0.65rem" }}
              >
                <LayoutDashboard size={13} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-all duration-200 font-display uppercase tracking-widest"
                style={{ fontSize: "0.65rem" }}
              >
                <LogOut size={13} />
                Salir ({user?.name.split(" ")[0]})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-display uppercase tracking-widest"
                style={{ fontSize: "0.65rem" }}
              >
                <LogIn size={13} />
                Ingresar
              </Link>
              <Link
                to="/register"
                className="flex items-center px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-display uppercase tracking-widest"
                style={{ fontSize: "0.65rem" }}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/8 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground uppercase tracking-widest"
              style={{ fontSize: "0.8rem" }}
            >
              {l}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-primary uppercase tracking-widest font-display" style={{ fontSize: "0.8rem" }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-left text-muted-foreground uppercase tracking-widest" style={{ fontSize: "0.8rem" }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-muted-foreground uppercase tracking-widest" style={{ fontSize: "0.8rem" }}>
                Ingresar
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="text-primary uppercase tracking-widest font-display" style={{ fontSize: "0.8rem" }}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
