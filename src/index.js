const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require("cors");
const multer = require("multer");
const path = require('path');

// Load environment variables
dotenv.config();

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const app = express();
// Initialize upload variable
const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cors("*"))

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the MySQL server.');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

app.get('/images/:path', (req, res) => {
  res.sendFile(path.join(__dirname, '../uploads', req.params.path));
}
);
app.get('/getUser', (req, res) => {
  let sql = 'SELECT * FROM anggota';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Add a new book
app.post('/addBook',upload.single('cover'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('Please upload a file.');
    }
    let book = { Kode_Buku: req.body.Kode_Buku, Judul: req.body.Judul, Penulis: req.body.Penulis, Pengarang: req.body.Pengarang, Tahun_Terbit: req.body.Tahun_Terbit, Stok: req.body.Stok, ID_Kategori: req.body.ID_Kategori, path: file.originalname };
    let sql = 'INSERT INTO buku SET ?';
    db.query(sql, book, (err, result) => {
      if (err) throw err;
      res.send('Book added successfully');
      // save file with multer
    });
  }
  catch (error) {
    console.log(error)
  }
});

// Get all books
app.get('/getBooks', (req, res) => {
  let sql = 'SELECT * FROM buku';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single book by Kode_Buku
app.get('/getBook/:Kode_Buku', (req, res) => {
  let sql = `SELECT * FROM buku WHERE Kode_Buku = ${db.escape(req.params.Kode_Buku)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update a book
app.post('/updateBook/:Kode_Buku',upload.single('cover'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('Please upload a file.');
  }
  let sql = `UPDATE buku SET Judul = ${db.escape(req.body.Judul)}, Penulis = ${db.escape(req.body.Penulis)}, Pengarang = ${db.escape(req.body.Pengarang)}, Tahun_Terbit = ${db.escape(req.body.Tahun_Terbit)}, Stok = ${db.escape(req.body.Stok)}, ID_Kategori = ${db.escape(req.body.ID_Kategori)}, path = '${file.originalname}' WHERE Kode_Buku = ${db.escape(req.params.Kode_Buku)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Book updated successfully');
  });
});

// Delete a book
app.get('/deleteBook/:Kode_Buku', (req, res) => {
  let sql = `DELETE FROM buku WHERE Kode_Buku = ${db.escape(req.params.Kode_Buku)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Book deleted successfully');
  });
});


// Add a new category
app.post('/addCategory', (req, res) => {
  let category = {Nama_Kategori: req.body.Nama_Kategori };
  let sql = 'INSERT INTO kategori_buku SET ?';
  db.query(sql, category, (err, result) => {
    if (err) throw err;
    res.send('Category added successfully');
  });
});

// Get all categories
app.get('/getCategories', (req, res) => {
  let sql = 'SELECT * FROM kategori_buku';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single category by ID_Kategori
app.get('/getCategory/:ID_Kategori', (req, res) => {
  let sql = `SELECT * FROM kategori_buku WHERE ID_Kategori = ${db.escape(req.params.ID_Kategori)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update a category
app.post('/updateCategory/:ID_Kategori', (req, res) => {
  let sql = `UPDATE kategori_buku SET Nama_Kategori = ${db.escape(req.body.Nama_Kategori)} WHERE ID_Kategori = ${db.escape(req.params.ID_Kategori)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Category updated successfully');
  });
});

// Delete a category
app.get('/deleteCategory/:ID_Kategori', (req, res) => {
  let sql = `DELETE FROM kategori_buku WHERE ID_Kategori = ${db.escape(req.params.ID_Kategori)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Category deleted successfully');
  });
});