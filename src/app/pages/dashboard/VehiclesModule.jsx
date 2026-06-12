import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search } from "lucide-react";
import { useVehicles } from "../../context/VehiclesContext";

const EMPTY_FORM = {
  name: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  km: 0,
  hp: 0,
  fuel: "Gasolina",
  transmission: "Automático",
  category: "Sedán",
  color: "",
  image: "",
  badge: "Nuevo",
  status: "disponible",
  description: "",
};

const STATUS_COLORS = {
  disponible: "#22c55e",
  reservado: "#f59e0b",
  vendido: "#ef4444",
};

export function VehiclesModule() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(v) {
    setForm({
      name: v.name,
      brand: v.brand,
      model: v.model,
      year: v.year,
      price: v.price,
      km: v.km,
      hp: v.hp,
      fuel: v.fuel,
      transmission: v.transmission,
      category: v.category,
      color: v.color,
      image: v.image,
      badge: v.badge,
      status: v.status,
      description: v.description,
    });
    setEditId(v.id);
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      updateVehicle(editId, form);
    } else {
      addVehicle(form);
    }
    setShowForm(false);
    setEditId(null);
  }

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-foreground" style={{ fontSize: "1.4rem", fontWeight: 700 }}>Gestión de Vehículos</h2>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>{vehicles.length} vehículos en inventario</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 font-display uppercase tracking-widest transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.68rem" }}
        >
          <Plus size={14} />
          Agregar Vehículo
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o marca..."
          className="w-full bg-secondary border border-border text-foreground pl-9 pr-4 py-2.5 outline-none focus:border-primary transition-colors"
          style={{ fontSize: "0.88rem" }}
        />
      </div>

      <div className="border border-border overflow-x-auto">
        <table className="w-full">
          <thead style={{ background: "var(--card)" }}>
            <tr>
              {["Vehículo", "Año", "Precio COP", "Km", "Estado", "Acciones"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-display uppercase tracking-widest text-muted-foreground border-b border-border" style={{ fontSize: "0.6rem" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-b border-border hover:bg-card/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt={v.name} className="w-14 h-10 object-cover flex-shrink-0" style={{ background: "var(--secondary)" }} />
                    <div>
                      <p className="font-display text-foreground" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{v.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{v.category} · {v.fuel}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground" style={{ fontSize: "0.85rem" }}>{v.year}</td>
                <td className="px-4 py-3 font-display" style={{ fontSize: "0.85rem", color: "var(--primary)" }}>${v.price.toLocaleString("es-CO")}</td>
                <td className="px-4 py-3 text-foreground" style={{ fontSize: "0.85rem" }}>{v.km.toLocaleString("es-CO")}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 font-display uppercase tracking-wider"
                    style={{ fontSize: "0.58rem", color: STATUS_COLORS[v.status], border: `1px solid ${STATUS_COLORS[v.status]}`, background: `${STATUS_COLORS[v.status]}18` }}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(v)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors" title="Editar"><Pencil size={14} /></button>
                    {deleteConfirm === v.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => { deleteVehicle(v.id); setDeleteConfirm(null); }} className="p-1.5 text-red-500 hover:text-red-400 transition-colors" title="Confirmar"><Check size={14} /></button>
                        <button onClick={() => setDeleteConfirm(null)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Cancelar"><X size={14} /></button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(v.id)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" title="Eliminar"><Trash2 size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-16 text-muted-foreground" style={{ fontSize: "0.85rem" }}>No se encontraron vehículos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border" style={{ background: "var(--background)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0" style={{ background: "var(--background)" }}>
              <h3 className="font-display text-foreground" style={{ fontSize: "1rem", fontWeight: 600 }}>{editId ? "Editar Vehículo" : "Agregar Vehículo"}</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Nombre completo", field: "name", placeholder: "Porsche 911 GT3" },
                { label: "Marca", field: "brand", placeholder: "Porsche" },
                { label: "Modelo", field: "model", placeholder: "911 GT3" },
                { label: "Color", field: "color", placeholder: "Blanco Carrara" },
                { label: "URL de Imagen", field: "image", placeholder: "https://..." },
                { label: "Badge", field: "badge", placeholder: "Nuevo / Certificado / Exclusivo" },
              ].map(({ label, field, placeholder }) => (
                <div key={field} className={field === "image" ? "sm:col-span-2" : ""}>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>{label}</label>
                  <input required={["name", "brand", "model"].includes(field)} value={String(form[field])} onChange={(e) => setField(field, e.target.value)} placeholder={placeholder} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors" style={{ fontSize: "0.88rem" }} />
                </div>
              ))}

              {[
                { label: "Año", field: "year" },
                { label: "Precio (COP)", field: "price" },
                { label: "Kilómetros", field: "km" },
                { label: "Potencia (hp)", field: "hp" },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>{label}</label>
                  <input type="number" required value={Number(form[field])} onChange={(e) => setField(field, Number(e.target.value))} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors" style={{ fontSize: "0.88rem" }} min={0} />
                </div>
              ))}

              {[
                { label: "Combustible", field: "fuel", options: ["Gasolina", "Diésel", "Eléctrico", "Híbrido"] },
                { label: "Transmisión", field: "transmission", options: ["Manual", "Automático", "PDK", "Tiptronic", "CVT"] },
                { label: "Categoría", field: "category", options: ["Deportivos", "SUV", "Sedán", "Eléctrico", "Camioneta", "Convertible"] },
                { label: "Estado", field: "status", options: ["disponible", "reservado", "vendido"] },
              ].map(({ label, field, options }) => (
                <div key={field}>
                  <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>{label}</label>
                  <select value={String(form[field])} onChange={(e) => setField(field, e.target.value)} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors appearance-none cursor-pointer" style={{ fontSize: "0.88rem" }}>
                    {options.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </select>
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="font-display uppercase tracking-widest text-muted-foreground block mb-1.5" style={{ fontSize: "0.58rem" }}>Descripción</label>
                <textarea rows={3} value={form.description} onChange={(e) => setField("description", e.target.value)} className="w-full bg-secondary border border-border text-foreground px-3 py-2.5 outline-none focus:border-primary transition-colors resize-none" style={{ fontSize: "0.88rem" }} />
              </div>

              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 font-display uppercase tracking-widest transition-all hover:opacity-90" style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.68rem" }}>{editId ? "Guardar Cambios" : "Agregar Vehículo"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 font-display uppercase tracking-widest border border-border text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.68rem" }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

