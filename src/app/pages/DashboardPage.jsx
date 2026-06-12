import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Car, TrendingUp, LayoutDashboard, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useVehicles } from "../context/VehiclesContext";
import { VehiclesModule } from "./dashboard/VehiclesModule";
import { SalesModule } from "./dashboard/SalesModule";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { vehicles, sales } = useVehicles();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const available = vehicles.filter((v) => v.status === "disponible").length;
  const reserved = vehicles.filter((v) => v.status === "reservado").length;
  const sold = vehicles.filter((v) => v.status === "vendido").length;
  const totalRevenue = sales.reduce((a, s) => a + s.salePrice, 0);

  const NAV_ITEMS = [
    { id: "overview", label: "Resumen", icon: LayoutDashboard },
    { id: "vehicles", label: "Vehículos", icon: Car },
    { id: "sales", label: "Ventas", icon: TrendingUp },
  ];

  const Sidebar = () => (
    <aside className="flex flex-col h-full border-r border-border" style={{ background: "var(--card)", width: "240px", minWidth: "240px" }}>
      <div className="p-6 border-b border-border">
        <Link to="/" className="font-display tracking-[0.2em] uppercase block" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
          <span style={{ color: "var(--primary)" }}>APEX</span> MOTORS
        </Link>
        <p className="text-muted-foreground mt-1 capitalize" style={{ fontSize: "0.68rem" }}>
          {user?.role} · {user?.name}
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => { setTab(id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200"
                aria-current={tab === id ? "page" : undefined}
                style={{
                  background: tab === id ? "var(--primary)" : "transparent",
                  color: tab === id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={15} />
                <span className="font-display uppercase tracking-widest" style={{ fontSize: "0.65rem" }}>
                  {label}
                </span>
                {tab === id && <ChevronRight size={12} className="ml-auto" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full mb-2"
          style={{ fontSize: "0.72rem" }}
        >
          <span className="font-display uppercase tracking-widest">Ver Landing</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full"
          style={{ fontSize: "0.72rem" }}
        >
          <LogOut size={14} />
          <span className="font-display uppercase tracking-widest">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border" style={{ background: "var(--card)" }}>
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-foreground uppercase tracking-widest" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              {NAV_ITEMS.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center font-display text-primary-foreground" style={{ background: "var(--primary)", fontSize: "0.7rem", fontWeight: 700 }}>
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-muted-foreground" style={{ fontSize: "0.78rem" }}>
              {user?.name}
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {tab === "overview" && (
            <div>
              <div className="mb-8">
                <p className="font-display uppercase tracking-[0.25em] mb-1" style={{ fontSize: "0.65rem", color: "var(--primary)" }}>
                  Bienvenido de vuelta
                </p>
                <h2 className="font-display text-foreground" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>
                  {user?.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Disponibles", value: available, color: "#22c55e", onClick: () => setTab("vehicles") },
                  { label: "Reservados", value: reserved, color: "#f59e0b", onClick: () => setTab("vehicles") },
                  { label: "Vendidos", value: sold, color: "#ef4444", onClick: () => setTab("sales") },
                  { label: "Ingresos COP", value: `${totalRevenue.toLocaleString("es-CO")}`, color: "var(--primary)", onClick: () => setTab("sales") },
                ].map((kpi) => (
                  <button
                    key={kpi.label}
                    onClick={kpi.onClick}
                    className="text-left border border-border p-5 hover:border-primary/40 transition-all duration-200 group"
                    style={{ background: "var(--card)" }}
                  >
                    <p className="font-display uppercase tracking-widest text-muted-foreground mb-3 group-hover:text-foreground transition-colors" style={{ fontSize: "0.58rem" }}>
                      {kpi.label}
                    </p>
                    <p className="font-display" style={{ fontSize: kpi.label === "Ingresos COP" ? "1rem" : "2rem", fontWeight: 700, color: kpi.color }}>
                      {kpi.value}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-display uppercase tracking-widest text-muted-foreground mb-4" style={{ fontSize: "0.65rem" }}>
                  Acciones Rápidas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTab("vehicles")}
                    className="flex items-center gap-4 p-5 border border-border hover:border-primary/40 text-left transition-all duration-200 group"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      <Car size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="font-display text-foreground" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Gestionar Inventario</p>
                      <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.75rem" }}>Agregar, editar o eliminar vehículos</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={() => setTab("sales")}
                    className="flex items-center gap-4 p-5 border border-border hover:border-primary/40 text-left transition-all duration-200 group"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      <TrendingUp size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="font-display text-foreground" style={{ fontSize: "0.9rem", fontWeight: 600 }}>Gestionar Ventas</p>
                      <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.75rem" }}>Registrar y revisar transacciones</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                </div>
              </div>

              {sales.length > 0 && (
                <div>
                  <h3 className="font-display uppercase tracking-widest text-muted-foreground mb-4" style={{ fontSize: "0.65rem" }}>
                    Ventas Recientes
                  </h3>
                  <div className="border border-border" style={{ background: "var(--card)" }}>
                    {sales.slice(-5).reverse().map((s, i) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: i < Math.min(sales.length, 5) - 1 ? "1px solid var(--border)" : "none" }}
                      >
                        <div>
                          <p className="font-display text-foreground" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{s.vehicleName}</p>
                          <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{s.buyerName} · {new Date(s.saleDate).toLocaleDateString("es-CO")}</p>
                        </div>
                        <p className="font-display" style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: 600 }}>${s.salePrice.toLocaleString("es-CO")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "vehicles" && <VehiclesModule />}
          {tab === "sales" && <SalesModule />}
        </main>
      </div>
    </div>
  );
}
