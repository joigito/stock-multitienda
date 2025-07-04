// src/tiendas/1/ventas.ts

// Mock de ventas
let ventas = [
    { id: 1, productoId: 1, cantidad: 5, fecha: "2025-07-01" }
  ];
  
  /**
   * Obtiene la lista de ventas.
   */
  export function fetchVentas(): Promise<{ id: number; productoId: number; cantidad: number; fecha: string }[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...ventas]), 200));
  }
  
  /**
   * Agrega una nueva venta.
   */
  export function crearVenta(productoId: number, cantidad: number): Promise<{ id: number; productoId: number; cantidad: number; fecha: string }> {
    return new Promise((resolve) => {
      const nueva = { id: Date.now(), productoId, cantidad, fecha: new Date().toISOString().slice(0, 10) };
      ventas.push(nueva);
      setTimeout(() => resolve(nueva), 200);
    });
  }