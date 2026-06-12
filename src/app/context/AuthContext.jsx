import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("apex_users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("apex_users", JSON.stringify(users));
}

function seedDemoAccount() {
  const users = getUsers();
  if (!users.find((u) => u.email === "admin@apexmotors.co")) {
    const demo = {
      id: "demo-admin",
      name: "Admin Apex",
      email: "admin@apexmotors.co",
      password: "apex2024",
      role: "admin",
    };
    saveUsers([...users, demo]);
  }
}

seedDemoAccount();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("apex_session");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("apex_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("apex_session");
    }
  }, [user]);

  function register(name, email, password, role) {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
    };
    saveUsers([...users, newUser]);
    return { ok: true };
  }

  function login(email, password) {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    const { password: _p, ...rest } = found;
    setUser(rest);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
