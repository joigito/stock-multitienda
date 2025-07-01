import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-orange-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Stock Multitienda</h1>
        <p className="text-gray-700 mb-2">¡Bienvenido! Esta es la base de tu nueva app para gestionar productos, ventas, clientes y reportes en múltiples tiendas.</p>
        <p className="text-gray-500 text-sm">Próximamente: autenticación, gestión multi-tienda, y mucho más.</p>
      </div>
    </div>
  );
}

export default App;
