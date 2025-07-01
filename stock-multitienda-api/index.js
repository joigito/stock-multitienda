const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar base de datos
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Base de datos SQLite conectada.');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tiendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    rubro TEXT,
    activa INTEGER DEFAULT 1
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tienda_id INTEGER,
    nombre TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    precio REAL DEFAULT 0,
    FOREIGN KEY(tienda_id) REFERENCES tiendas(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tienda_id INTEGER,
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    FOREIGN KEY(tienda_id) REFERENCES tiendas(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tienda_id INTEGER,
    cliente_id INTEGER,
    fecha TEXT,
    total REAL,
    FOREIGN KEY(tienda_id) REFERENCES tiendas(id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(id)
  )`);
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Stock Multitienda funcionando!' });
});

// Aquí irán las rutas para tiendas, productos, clientes, ventas...

// --- TIENDAS ---

// Listar todas las tiendas
app.get('/tiendas', (req, res) => {
    db.all('SELECT * FROM tiendas', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Crear una nueva tienda
  app.post('/tiendas', (req, res) => {
    const { nombre, rubro } = req.body;
    db.run('INSERT INTO tiendas (nombre, rubro) VALUES (?, ?)', [nombre, rubro], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nombre, rubro });
    });
  });
  
  // --- PRODUCTOS ---
  
  // Listar productos de una tienda
  app.get('/tiendas/:tiendaId/productos', (req, res) => {
    const tiendaId = req.params.tiendaId;
    db.all('SELECT * FROM productos WHERE tienda_id = ?', [tiendaId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Crear producto en una tienda
  app.post('/tiendas/:tiendaId/productos', (req, res) => {
    const tiendaId = req.params.tiendaId;
    const { nombre, stock, precio } = req.body;
    db.run(
      'INSERT INTO productos (tienda_id, nombre, stock, precio) VALUES (?, ?, ?, ?)',
      [tiendaId, nombre, stock, precio],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, tienda_id: tiendaId, nombre, stock, precio });
      }
    );
  });
  
  // --- CLIENTES ---
  
  // Listar clientes de una tienda
  app.get('/tiendas/:tiendaId/clientes', (req, res) => {
    const tiendaId = req.params.tiendaId;
    db.all('SELECT * FROM clientes WHERE tienda_id = ?', [tiendaId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Crear cliente en una tienda
  app.post('/tiendas/:tiendaId/clientes', (req, res) => {
    const tiendaId = req.params.tiendaId;
    const { nombre, email, telefono } = req.body;
    db.run(
      'INSERT INTO clientes (tienda_id, nombre, email, telefono) VALUES (?, ?, ?, ?)',
      [tiendaId, nombre, email, telefono],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, tienda_id: tiendaId, nombre, email, telefono });
      }
    );
  });
  
  // --- VENTAS ---
  
  // Listar ventas de una tienda
  app.get('/tiendas/:tiendaId/ventas', (req, res) => {
    const tiendaId = req.params.tiendaId;
    db.all('SELECT * FROM ventas WHERE tienda_id = ?', [tiendaId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Crear venta en una tienda
  app.post('/tiendas/:tiendaId/ventas', (req, res) => {
    const tiendaId = req.params.tiendaId;
    const { cliente_id, fecha, total } = req.body;
    db.run(
      'INSERT INTO ventas (tienda_id, cliente_id, fecha, total) VALUES (?, ?, ?, ?)',
      [tiendaId, cliente_id, fecha, total],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, tienda_id: tiendaId, cliente_id, fecha, total });
      }
    );
  });
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
