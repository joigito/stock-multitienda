import { useEffect, useState } from "react";
import { fetchTiendas, crearTienda } from "./api";
import TiendaPanel from "./components/TiendaPanel";

function App() {
  const [tiendas, setTiendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [rubro, setRubro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState<number | null>(null);

  const cargarTiendas = () => {
    setLoading(true);
    fetchTiendas()
      .then(setTiendas)
      .catch(() => setTiendas([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarTiendas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    try {
      await crearTienda(nombre, rubro);
      setNombre("");
      setRubro("");
      setMensaje("¡Tienda creada!");
      cargarTiendas();
    } catch {
      setMensaje("Error al crear tienda");
    }
  };

  return (
    <div className="p-6">
      <h1>Stock Multitienda</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la tienda"
          required
        />
        <input
          value={rubro}
          onChange={(e) => setRubro(e.target.value)}
          placeholder="Rubro"
          required
        />
        <button type="submit">Crear tienda</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h2>Tiendas registradas</h2>
      {loading ? (
        <p>Cargando tiendas...</p>
      ) : (
        <ul>
          {tiendas.map((t) => (
            <li key={t.id}>
              <button onClick={() => setTiendaSeleccionada(t.id)}>
                {t.nombre} {t.rubro && <span>({t.rubro})</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "2em 0" }} />

      {tiendaSeleccionada && (
        <TiendaPanel
          nombre={tiendas.find(t => t.id === tiendaSeleccionada)?.nombre || ""}
          subtitulo="Gestión de inventario para mascotas y forrajería"
        />
      )}
    </div>
  );
}

export default App;