// src/api.ts

// Datos simulados (mock) de tiendas
let tiendas = [
    { id: 1, nombre: "Tienda Central" },
    { id: 2, nombre: "Sucursal Norte" }
  ];
  
  /**
   * Simula la obtención de la lista de tiendas.
   * @returns Promise con el array de tiendas.
   */
  export function fetchTiendas(): Promise<{ id: number; nombre: string }[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...tiendas]), 300); // Simula un pequeño retraso
    });
  }
  
  /**
   * Simula la creación de una nueva tienda.
   * @param nombre Nombre de la tienda a crear.
   * @returns Promise con el objeto de la nueva tienda.
   */
  export function crearTienda(nombre: string): Promise<{ id: number; nombre: string }> {
    return new Promise((resolve) => {
      const nuevaTienda = { id: Date.now(), nombre };
      tiendas.push(nuevaTienda);
      setTimeout(() => resolve(nuevaTienda), 300); // Simula un pequeño retraso
    });
  }