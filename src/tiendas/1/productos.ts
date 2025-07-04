// src/tiendas/1/productos.ts

// Mock de productos
let productos = [
    { id: 1, nombre: "Producto A" },
    { id: 2, nombre: "Producto B" }
  ];
  
  /**
   * Obtiene la lista de productos.
   */
  export function fetchProductos(): Promise<{ id: number; nombre: string }[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...productos]), 200));
  }
  
  /**
   * Agrega un nuevo producto.
   */
  export function crearProducto(nombre: string): Promise<{ id: number; nombre: string }> {
    return new Promise((resolve) => {
      const nuevo = { id: Date.now(), nombre };
      productos.push(nuevo);
      setTimeout(() => resolve(nuevo), 200);
    });
  }