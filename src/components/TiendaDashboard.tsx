import React, { useEffect, useState } from "react";

type Producto = { id: number; nombre: string };
type Venta = { id: number; productoId: number; cantidad: number; fecha: string };
type Empleado = { id: number; nombre: string };

interface Props {
  tiendaId: number;
}

const TiendaDashboard: React.FC<Props> = ({ tiendaId }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [ventaProductoId, setVentaProductoId] = useState<number>(0);
  const [ventaCantidad, setVentaCantidad] = useState<number>(1);
  const [nuevoEmpleado, setNuevoEmpleado] = useState("");

  // Carga dinámica de módulos según tiendaId
  useEffect(() => {
    let productosApi: any, ventasApi: any, empleadosApi: any;
    async function loadModules() {
      productosApi = await import(`../tiendas/${tiendaId}/productos`);
      ventasApi = await import(`../tiendas/${tiendaId}/ventas`);
      empleadosApi = await import(`../tiendas/${tiendaId}/empleados`);
      productosApi.fetchProductos().then(setProductos);
      ventasApi.fetchVentas().then(setVentas);
      empleadosApi.fetchEmpleados().then(setEmpleados);
    }
    loadModules();
  }, [tiendaId]);

  const handleAgregarProducto = async () => {
    const productosApi = await import(`../tiendas/${tiendaId}/productos`);
    if (nuevoProducto.trim()) {
      const prod = await productosApi.crearProducto(nuevoProducto.trim());
      setProductos((prev) => [...prev, prod]);
      setNuevoProducto("");
    }
  };

  const handleAgregarVenta = async () => {
    const ventasApi = await import(`../tiendas/${tiendaId}/ventas`);
    if (ventaProductoId && ventaCantidad > 0) {
      const venta = await ventasApi.crearVenta(ventaProductoId, ventaCantidad);
      setVentas((prev) => [...prev, venta]);
      setVentaCantidad(1);
    }
  };

  const handleAgregarEmpleado = async () => {
    const empleadosApi = await import(`../tiendas/${tiendaId}/empleados`);
    if (nuevoEmpleado.trim()) {
      const emp = await empleadosApi.crearEmpleado(nuevoEmpleado.trim());
      setEmpleados((prev) => [...prev, emp]);
      setNuevoEmpleado("");
    }
  };

  return (
    <div>
      <h2>Dashboard Tienda {tiendaId}</h2>
      <h3>Productos</h3>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>{p.nombre}</li>
        ))}
      </ul>
      <input
        value={nuevoProducto}
        onChange={(e) => setNuevoProducto(e.target.value)}
        placeholder="Nuevo producto"
      />
      <button onClick={handleAgregarProducto}>Agregar producto</button>

      <h3>Ventas</h3>
      <ul>
        {ventas.map((v) => (
          <li key={v.id}>
            Producto ID: {v.productoId} | Cantidad: {v.cantidad} | Fecha: {v.fecha}
          </li>
        ))}
      </ul>
      <select
        value={ventaProductoId}
        onChange={(e) => setVentaProductoId(Number(e.target.value))}
      >
        <option value={0}>Selecciona producto</option>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        value={ventaCantidad}
        onChange={(e) => setVentaCantidad(Number(e.target.value))}
        placeholder="Cantidad"
      />
      <button onClick={handleAgregarVenta}>Agregar venta</button>

      <h3>Empleados</h3>
      <ul>
        {empleados.map((e) => (
          <li key={e.id}>{e.nombre}</li>
        ))}
      </ul>
      <input
        value={nuevoEmpleado}
        onChange={(e) => setNuevoEmpleado(e.target.value)}
        placeholder="Nuevo empleado"
      />
      <button onClick={handleAgregarEmpleado}>Agregar empleado</button>
    </div>
  );
};

export default TiendaDashboard;