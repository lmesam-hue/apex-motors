import { createContext, useContext, useState } from "react";

const VehiclesContext = createContext(null);

const INITIAL_VEHICLES = [
  {
    id: "1",
    name: "Porsche 911 GT3",
    brand: "Porsche",
    model: "911 GT3",
    year: 2024,
    price: 890000000,
    km: 0,
    hp: 510,
    fuel: "Gasolina",
    transmission: "PDK",
    category: "Deportivos",
    color: "Blanco Carrara",
    image: "https://images.unsplash.com/photo-1681869916819-cb81574a02e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Nuevo",
    status: "disponible",
    description: "El ícono de los deportivos. Motor 4.0L de aspiración natural, 510 hp, 0-100 en 3.4s.",
    addedAt: "2024-01-10",
  },
  {
    id: "2",
    name: "BMW M5 Competition",
    brand: "BMW",
    model: "M5 Competition",
    year: 2024,
    price: 650000000,
    km: 0,
    hp: 625,
    fuel: "Gasolina",
    transmission: "Automático",
    category: "Sedán",
    color: "Marina Bay Blue",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Nuevo",
    status: "disponible",
    description: "Sedán de alto rendimiento con 625 hp y tracción integral M xDrive.",
    addedAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Lamborghini Urus S",
    brand: "Lamborghini",
    model: "Urus S",
    year: 2024,
    price: 1450000000,
    km: 0,
    hp: 666,
    fuel: "Gasolina",
    transmission: "Automático",
    category: "SUV",
    color: "Giallo Belenus",
    image: "https://images.unsplash.com/photo-1748189285388-c8852b6a7ed6?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1748189285388-c8852b6a7ed6?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Exclusivo",
    status: "disponible",
    description: "El SUV más potente del mundo. 666 hp, 0-100 en 3.5s, top speed 305 km/h.",
    addedAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 420000000,
    km: 150,
    hp: 1020,
    fuel: "Eléctrico",
    transmission: "Automático",
    category: "Eléctrico",
    color: "Blanco Perlado",
    image: "https://images.unsplash.com/photo-1716558964076-1abe07448abf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Eléctrico",
    status: "disponible",
    description: "1.020 hp eléctricos, 0-100 en 2.1s. El sedán más rápido de producción.",
    addedAt: "2024-01-18",
  },
  {
    id: "5",
    name: "Porsche Cayenne GTS",
    brand: "Porsche",
    model: "Cayenne GTS",
    year: 2023,
    price: 560000000,
    km: 8200,
    hp: 460,
    fuel: "Gasolina",
    transmission: "Tiptronic",
    category: "SUV",
    color: "Negro Jet",
    image: "https://images.unsplash.com/photo-1609386464913-4cbfa39de540?w=800&h=500&fit=crop&auto=format",
    badge: "Certificado",
    status: "disponible",
    description: "La versión más deportiva del Cayenne, con suspensión sport y interior exclusivo.",
    addedAt: "2024-01-20",
  },
  {
    id: "6",
    name: "Mercedes C63 AMG",
    brand: "Mercedes-Benz",
    model: "C63 AMG",
    year: 2023,
    price: 380000000,
    km: 12400,
    hp: 476,
    fuel: "Híbrido",
    transmission: "Automático",
    category: "Sedán",
    color: "Gris Selenita",
    image: "https://images.unsplash.com/photo-1619284111834-34efc7051f0e?w=800&h=500&fit=crop&auto=format",
    badge: "Certificado",
    status: "disponible",
    description: "476 hp híbridos, torque vectorial en el eje trasero. El AMG más avanzado jamás construido.",
    addedAt: "2024-01-22",
  },
];

const INITIAL_SALES = [
  {
    id: "s1",
    vehicleId: "sold1",
    vehicleName: "Ferrari 488 GTB",
    buyerName: "Rodrigo Salcedo",
    buyerEmail: "rsalcedo@email.com",
    buyerPhone: "+57 312 890 1234",
    salePrice: 1200000000,
    paymentMethod: "contado",
    saleDate: "2024-03-05",
    seller: "Carlos Méndez",
    notes: "Cliente VIP. Entrega en showroom.",
  },
  {
    id: "s2",
    vehicleId: "sold2",
    vehicleName: "Porsche Macan GTS",
    buyerName: "Isabella Fernández",
    buyerEmail: "ifernandez@gmail.com",
    buyerPhone: "+57 300 445 6789",
    salePrice: 310000000,
    paymentMethod: "credito",
    saleDate: "2024-03-18",
    seller: "Laura Torres",
    notes: "Financiado a 60 meses con Bancolombia.",
  },
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function VehiclesProvider({ children }) {
  // Siempre usa INITIAL_VEHICLES como base (actualiza si cambian las URLs)
  const [vehicles, setVehicles] = useState(() => {
    const saved = load("apex_vehicles", null);
    if (!saved) return INITIAL_VEHICLES;
    // Mezcla datos guardados con INITIAL para preservar cambios del usuario
    // pero sobrescribe imágenes con las nuevas
    const merged = INITIAL_VEHICLES.map((initial) => {
      const existing = saved.find((v) => v.id === initial.id);
      return existing ? { ...existing, image: initial.image } : initial;
    });
    // Agrega vehículos que el usuario haya creado (no están en INITIAL)
    const userAdded = saved.filter((v) => !INITIAL_VEHICLES.find((i) => i.id === v.id));
    return [...merged, ...userAdded];
  });
  const [sales, setSales] = useState(() => load("apex_sales", INITIAL_SALES));

  function persist(v) {
    setVehicles(v);
    localStorage.setItem("apex_vehicles", JSON.stringify(v));
  }

  function persistSales(s) {
    setSales(s);
    localStorage.setItem("apex_sales", JSON.stringify(s));
  }

  function addVehicle(data) {
    const newV = { ...data, id: crypto.randomUUID(), addedAt: new Date().toISOString().split("T")[0] };
    persist([...vehicles, newV]);
  }

  function updateVehicle(id, data) {
    persist(vehicles.map((v) => (v.id === id ? { ...v, ...data } : v)));
  }

  function deleteVehicle(id) {
    persist(vehicles.filter((v) => v.id !== id));
  }

  function addSale(data) {
    const newS = { ...data, id: crypto.randomUUID(), saleDate: new Date().toISOString().split("T")[0] };
    updateVehicle(data.vehicleId, { status: "vendido" });
    persistSales([...sales, newS]);
  }

  function deleteSale(id) {
    persistSales(sales.filter((s) => s.id !== id));
  }

  return (
    <VehiclesContext.Provider value={{ vehicles, sales, addVehicle, updateVehicle, deleteVehicle, addSale, deleteSale }}>
      {children}
    </VehiclesContext.Provider>
  );
}

export function useVehicles() {
  const ctx = useContext(VehiclesContext);
  if (!ctx) throw new Error("useVehicles must be used within VehiclesProvider");
  return ctx;
}
