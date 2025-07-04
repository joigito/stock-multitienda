// src/tiendas/1/empleados.ts

// Mock de empleados
let empleados = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Ana Gómez" }
  ];
  
  /**
   * Obtiene la lista de empleados.
   */
  export function fetchEmpleados(): Promise<{ id: number; nombre: string }[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...empleados]), 200));
  }
  
  /**
   * Agrega un nuevo empleado.
   */
  export function crearEmpleado(nombre: string): Promise<{ id: number; nombre: string }> {
    return new Promise((resolve) => {
      const nuevo = { id: Date.now(), nombre };
      empleados.push(nuevo);
      setTimeout(() => resolve(nuevo), 200);
    });
  }