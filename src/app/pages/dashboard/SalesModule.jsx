import { useState } from "react";
import { Plus, Trash2, X, Check, TrendingUp, DollarSign, Car, Search } from "lucide-react";
import { useVehicles } from "../../context/VehiclesContext";

const PAYMENT_LABELS = {
  contado: "Contado",
  credito: "Crédito",
  leasing: "Leasing",
};

const PAYMENT_COLORS = {
  contado: "#22c55e",
  credito: "#3b82f6",
  leasing: "#a855f7",
};

export function SalesModule() {
  const { vehicles, sales, addSale, deleteSale } = useVehicles();
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    vehicleId: "",
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    salePrice: 0,
    paymentMethod: "contado",
    seller: "",
    notes: "",
  });

  const availableVehicles = vehicles.filter((v) => v.status === "disponible" || v.status === "reservado");

  const totalRevenue = sales.reduce((acc, s) => acc + s.salePrice, 0);
  const avgPrice = sales.length ? Math.round(totalRevenue / sales.length) : 0;

  const filteredSales = sales.filter(
    (s) =>
      s.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
      s.buyerName.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    const vehicle = vehicles.find((v) => v.id === form.vehicleId);
    if (!vehicle) return;
    addSale({ ...form, vehicleName: vehicle.name });
    setForm({
      vehicleId: "",
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      salePrice: 0,
      paymentMethod: "contado",
      seller: "",
      notes: "",
    });
    setShowForm(false);
  }

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-foreground" style={{ fontSize: "1.4rem", fontWeight: 700 }}>Gestión de Ventas</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>{sales.length} ventas registradas</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 font-display uppercase tracking-widest transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.68rem" }}
        >
          <Plus size={14} />
          Registrar Venta
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: DollarSign, label: "Ingresos Totales", value: `$${totalRevenue.toLocaleString("es-CO")}`, sub: "COP acumulados" },
          { icon: Car, label: "Ventas Realizadas", value: String(sales.length), sub: "vehículos vendidos" },
          { icon: TrendingUp, label: "Precio Promedio", value: `$${avgPrice.toLocaleString("es-CO")}`, sub: "COP por venta" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="border border-border p-5" style={{ background: "var(--card)" }}>
              <div className="flex items-start justify-between mb-3">
                <p className="font-display uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.6rem" }}>{kpi.label}</p>
                <Icon size={16} style={{ color: "var(--primary)" }} />
              </div>
              <p className="font-display text-foreground" style={{ fontSize: "1.6rem", fontWeight: 700 }}>{kpi.value}</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "0.72rem" }}>{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="relative mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por vehículo o comprador..."
          className="w-full bg-secondary border border-border text-foreground pl-9 pr-4 py-2.5 outline-none focus:border-primary transition-colors"
          style={{ fontSize: "0.88rem" }}
        />
      </div>


      <div className="border border-border overflow-x-auto">
        <table className="w-full">
          <thead style={{ background: "var(--card)" }}>
            <tr>
              {["Vehículo", "Comprador", "Precio Venta", "Pago", "Fecha", "Vendedor", "Acciones"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-display uppercase tracking-widest text-muted-foreground border-b border-border" style={{ fontSize: "0.6rem" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((s) => (
              <tr key={s.id} className="border-b border-border hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 text-foreground font-display" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{s.vehicleName}</td>
                <td className="px-4 py-3">
                  <p className="text-foreground" style={{ fontSize: "0.85rem" }}>{s.buyerName}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>{s.buyerPhone}</p>
                </td>
                <td className="px-4 py-3 font-display" style={{ fontSize: "0.85rem", color: "var(--primary)" }}>${s.salePrice.toLocaleString("es-CO")}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 font-display uppercase tracking-wider"
                    style={{ fontSize: "0.58rem", color: PAYMENT_COLORS[s.paymentMethod], border: `1px solid ${PAYMENT_COLORS[s.paymentMethod]}`, background: `${PAYMENT_COLORS[s.paymentMethod]}18` }}
                  >
                    {PAYMENT_LABELS[s.paymentMethod]}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{new Date(s.saleDate).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" })}</td>
                <td className="px-4 py-3 text-foreground" style={{ fontSize: "0.82rem" }}>{s.seller}</td>
                <td className="px-4 py-3">
                  {deleteConfirm === s.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => { deleteSale(s.id); setDeleteConfirm(null); }} className="p-1.5 text-red-500 hover:text-red-400 transition-colors"><Check size={14} /></button>
                      <button onClick={() => setDeleteConfirm(null)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><X size={14} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(s.id)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  )}
                </td>
              </tr>
            ))}
            {filteredSales.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-muted-foreground" style={{ fontSize: "0.85rem" }}>No se encontraron ventas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto border border-border" style={{ background: "var(--background)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0" style={{ background: "var(--background)" }}>
              <h3 className="font-display text-foreground" style={{ fontSize: "1rem", fontWeight: 600 }}>Registrar Nueva Venta</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>Vehículo</label>
                <select
                  required
                  value={form.vehicleId}
                  onChange={(e) => {
                    const v = vehicles.find((x) => x.id === e.target.value);
                    setField("vehicleId", e.target.value);
                    if (v) setField("salePrice", v.price);
                  }}
                  className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  style={{ fontSize: "0.88rem" }}
                >
                  <option value="">Seleccionar vehículo...</option>
                  {availableVehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} — ${v.price.toLocaleString("es-CO")} COP</option>
                  ))}
                </select>
                {availableVehicles.length === 0 && (
                  <p className="text-muted-foreground mt-2" style={{ fontSize: "0.75rem" }}>No hay vehículos disponibles para venta.</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Nombre del Comprador", field: "buyerName", placeholder: "Juan García" },
                  { label: "Correo del Comprador", field: "buyerEmail", placeholder: "comprador@email.com" },
                  { label: "Teléfono", field: "buyerPhone", placeholder: "+57 300 000 0000" },
                  { label: "Nombre del Vendedor", field: "seller", placeholder: "Carlos Méndez" },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>{label}</label>
                    <input required value={String(form[field])} onChange={(e) => setField(field, e.target.value)} placeholder={placeholder} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors" style={{ fontSize: "0.88rem" }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>Precio de Venta (COP)</label>
                  <input type="number" required value={form.salePrice} onChange={(e) => setField("salePrice", Number(e.target.value))} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors" style={{ fontSize: "0.88rem" }} min={0} />
                </div>
                <div>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>Método de Pago</label>
                  <select value={form.paymentMethod} onChange={(e) => setField("paymentMethod", e.target.value)} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors appearance-none cursor-pointer" style={{ fontSize: "0.88rem" }}>
                    <option value="contado">Contado</option>
                    <option value="credito">Crédito</option>
                    <option value="leasing">Leasing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>Notas (opcional)</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setField("notes", e.target.value)} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors resize-none" style={{ fontSize: "0.88rem" }} placeholder="Observaciones adicionales..." />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 font-display uppercase tracking-widest transition-all hover:opacity-90" style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.68rem" }}>Registrar Venta</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 font-display uppercase tracking-widest border border-border text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.68rem" }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
