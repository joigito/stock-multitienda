export async function fetchTiendas() {
    const resp = await fetch('http://localhost:4000/tiendas');
    if (!resp.ok) throw new Error('Error al obtener tiendas');
    return resp.json();
  }
  
  export async function crearTienda(nombre: string, rubro: string) {
    const resp = await fetch('http://localhost:4000/tiendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, rubro }),
    });
    if (!resp.ok) throw new Error('Error al crear tienda');
    return resp.json();
  }