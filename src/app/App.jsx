import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { VehiclesProvider } from "./context/VehiclesContext";

export default function App() {
  return (
    <AuthProvider>
      <VehiclesProvider>
        <RouterProvider router={router} />
      </VehiclesProvider>
    </AuthProvider>
  );
}
