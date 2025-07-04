import React, { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
}
interface Cliente {
  id: number;
  nombre: string;
}
interface Venta {
  id: number;
  fecha: string;
  productoId: number;
  clienteId: number;
  cantidad: number;
  total: number;
}

interface TiendaPanelProps {
  nombre: string;
  subtitulo: string;
}

const tabs = [
  { key: "inicio", label: "Inicio" },
  { key: "inventario", label: "Inventario" },
  { key: "ventas", label: "Ventas" },
  { key: "clientes", label: "Clientes" },
  { key: "reportes", label: "Reportes" },
];

const TiendaPanel: React.FC<TiendaPanelProps> = ({ nombre, subtitulo }) => {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  // Estados para mock de productos, clientes, ventas
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: "Alimento Premium", categoria: "Mascotas", stock: 12, precio: 4500 },
    { id: 2, nombre: "Rascador", categoria: "Mascotas", stock: 5, precio: 12000 },
    { id: 3, nombre: "Fardo Alfalfa", categoria: "Forrajería", stock: 20, precio: 3200 },
    { id: 4, nombre: "Bebedero", categoria: "Mascotas", stock: 8, precio: 2500 },
  ]);
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Ana Gómez" },
    { id: 3, nombre: "Carlos Díaz" },
  ]);
  const [ventas, setVentas] = useState<Venta[]>([
    { id: 1, fecha: "2025-07-01", productoId: 1, clienteId: 1, cantidad: 2, total: 9000 },
    { id: 2, fecha: "2025-07-02", productoId: 3, clienteId: 2, cantidad: 4, total: 12800 },
    { id: 3, fecha: "2025-07-03", productoId: 2, clienteId: 3, cantidad: 1, total: 12000 },
    { id: 4, fecha: "2025-07-03", productoId: 4, clienteId: 2, cantidad: 3, total: 7500 },
  ]);

  // Formularios
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", categoria: "", stock: 0, precio: 0 });
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "" });
  const [nuevaVenta, setNuevaVenta] = useState({ productoId: 0, clienteId: 0, cantidad: 1 });

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">{nombre}</h2>
          <p className="text-gray-500">{subtitulo}</p>
        </div>
        {/* Barra de acciones simulada */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">En línea</span>
          <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm">Limpiar Duplicados</button>
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">Sincronizar Todo</button>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 -mb-px border-b-2 ${
              activeTab === tab.key
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de pestañas */}
      <div>
        {/* INICIO */}
        {activeTab === "inicio" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Tarjeta 1 */}
            <div className="bg-blue-50 p-4 rounded shadow flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Total de Productos</div>
              <div className="text-3xl font-bold text-blue-700">4</div>
              <div className="text-xs text-gray-500">3 mascotas + 1 forrajería</div>
            </div>
            {/* Tarjeta 2 */}
            <div className="bg-green-50 p-4 rounded shadow flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Alertas de Stock</div>
              <div className="text-3xl font-bold text-green-700">0</div>
              <div className="text-xs text-green-700">Todo en orden</div>
            </div>
            {/* Tarjeta 3 */}
            <div className="bg-emerald-50 p-4 rounded shadow flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Valor Total Inventario</div>
              <div className="text-3xl font-bold text-emerald-700">$ 1.135.600</div>
              <div className="text-xs text-gray-500">Valor total del stock</div>
            </div>
            {/* Tarjeta 4 */}
            <div className="bg-rose-50 p-4 rounded shadow flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Promedio por Producto</div>
              <div className="text-3xl font-bold text-rose-700">$ 283.900</div>
              <div className="text-xs text-gray-500">Valor promedio por item</div>
            </div>
          </div>
        )}
        {/* INVENTARIO */}
        {activeTab === "inventario" && (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Inventario</h3>
            {/* Formulario agregar producto */}
            <form
              className="flex flex-wrap gap-2 mb-4 items-end"
              onSubmit={e => {
                e.preventDefault();
                if (!nuevoProducto.nombre || !nuevoProducto.categoria) return;
                setProductos(prev => [
                  ...prev,
                  { id: Date.now(), ...nuevoProducto }
                ]);
                setNuevoProducto({ nombre: "", categoria: "", stock: 0, precio: 0 });
              }}
            >
              <input
                className="border p-2 rounded"
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="Categoría"
                value={nuevoProducto.categoria}
                onChange={e => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                required
              />
              <input
                className="border p-2 rounded w-24"
                placeholder="Stock"
                type="number"
                min={0}
                value={nuevoProducto.stock}
                onChange={e => setNuevoProducto({ ...nuevoProducto, stock: Number(e.target.value) })}
                required
              />
              <input
                className="border p-2 rounded w-32"
                placeholder="Precio"
                type="number"
                min={0}
                value={nuevoProducto.precio}
                onChange={e => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
                required
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                Agregar producto
              </button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Producto</th>
                  <th className="px-4 py-2 border-b">Categoría</th>
                  <th className="px-4 py-2 border-b">Stock</th>
                  <th className="px-4 py-2 border-b">Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, i) => (
                  <tr key={p.id} className="text-center">
                    <td className="px-4 py-2 border-b">{p.nombre}</td>
                    <td className="px-4 py-2 border-b">{p.categoria}</td>
                    <td className="px-4 py-2 border-b">{p.stock}</td>
                    <td className="px-4 py-2 border-b">$ {p.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VENTAS */}
        {activeTab === "ventas" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Registrar venta</h3>
            {/* Formulario venta */}
            <form
              className="flex flex-wrap gap-2 mb-4 items-end"
              onSubmit={e => {
                e.preventDefault();
                if (!nuevaVenta.productoId || !nuevaVenta.clienteId) return;
                const producto = productos.find(p => p.id === nuevaVenta.productoId);
                if (!producto) return;
                const total = producto.precio * nuevaVenta.cantidad;
                setVentas(prev => [
                  ...prev,
                  {
                    id: Date.now(),
                    fecha: new Date().toISOString().slice(0, 10),
                    productoId: nuevaVenta.productoId,
                    clienteId: nuevaVenta.clienteId,
                    cantidad: nuevaVenta.cantidad,
                    total
                  }
                ]);
                setNuevaVenta({ productoId: 0, clienteId: 0, cantidad: 1 });
              }}
            >
              <select
                className="border p-2 rounded"
                value={nuevaVenta.productoId}
                onChange={e => setNuevaVenta({ ...nuevaVenta, productoId: Number(e.target.value) })}
                required
              >
                <option value={0}>Producto</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={nuevaVenta.clienteId}
                onChange={e => setNuevaVenta({ ...nuevaVenta, clienteId: Number(e.target.value) })}
                required
              >
                <option value={0}>Cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
              <input
                className="border p-2 rounded w-24"
                placeholder="Cantidad"
                type="number"
                min={1}
                value={nuevaVenta.cantidad}
                onChange={e => setNuevaVenta({ ...nuevaVenta, cantidad: Number(e.target.value) })}
                required
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                Registrar venta
              </button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Fecha</th>
                  <th className="px-4 py-2 border-b">Producto</th>
                  <th className="px-4 py-2 border-b">Cliente</th>
                  <th className="px-4 py-2 border-b">Cantidad</th>
                  <th className="px-4 py-2 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v, i) => (
                  <tr key={v.id} className="text-center">
                    <td className="px-4 py-2 border-b">{v.fecha}</td>
                    <td className="px-4 py-2 border-b">{productos.find(p => p.id === v.productoId)?.nombre || "-"}</td>
                    <td className="px-4 py-2 border-b">{clientes.find(c => c.id === v.clienteId)?.nombre || "-"}</td>
                    <td className="px-4 py-2 border-b">{v.cantidad}</td>
                    <td className="px-4 py-2 border-b">$ {v.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* CLIENTES */}
        {activeTab === "clientes" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Clientes</h3>
            {/* Formulario agregar cliente */}
            <form
              className="flex flex-wrap gap-2 mb-4 items-end"
              onSubmit={e => {
                e.preventDefault();
                if (!nuevoCliente.nombre) return;
                setClientes(prev => [
                  ...prev,
                  { id: Date.now(), ...nuevoCliente }
                ]);
                setNuevoCliente({ nombre: "" });
              }}
            >
              <input
                className="border p-2 rounded"
                placeholder="Nombre"
                value={nuevoCliente.nombre}
                onChange={e => setNuevoCliente({ nombre: e.target.value })}
                required
              />
              <button className="bg-purple-500 text-white px-4 py-2 rounded" type="submit">
                Agregar cliente
              </button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c, i) => (
                  <tr key={c.id} className="text-center">
                    <td className="px-4 py-2 border-b">{c.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* REPORTES */}
        {activeTab === "reportes" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Reportes rápidos</h3>
            <ul className="list-disc pl-6">
              <li>Productos con bajo stock: 0</li>
              <li>Ventas del mes: $ 30.300</li>
              <li>Clientes nuevos: 2</li>
              <li>Producto más vendido: Alimento Premium</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TiendaPanel;
