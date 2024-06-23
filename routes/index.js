var express = require("express");
var router = express.Router();
const middleware = require("../middleware/verifytoken")
const controller = require('../controller/auth.controller')
const profileLihat = require('../controller/lihatProfile')
const crudController = require('../controller/crudcontroller')




/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layouts/login1", { title: "Login" });
});


router.get('/login1', controller.form);
router.post('/showProfile', controller.checklogin, controller.changePassword);
router.post('/dashboardMhs',  controller.changePassword);
router.get("/showProfile", middleware.verifyToken, profileLihat.lihatProfil);
router.get("/logout", controller.logout);

// router.post('/dashboard', async (req, res) => {
//   try {
//     await changePassword(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Terjadi kesalahan server" });
//   }
// });

router.get("/dashboard", function (req, res, next) {
  res.render("layouts/dashboard", { title: "Login" });
});

router.get("/editprofile", function (req, res, next) {
  res.render("layouts/editprofile", { title: "Login" });
});

router.get("/password", function (req, res, next) {
  res.render("layouts/password", { title: "Login" });
});



router.get("/dashboardMhs", function (req, res, next) {
  res.render("Mhs/dashboardMhs", { title: "Login" });
});

router.get("/ProfileMhs", function (req, res, next) {
  res.render("Mhs/ProfileMhs", { title: "Login" });
});

router.get("/PinjamBuku", function (req, res, next) {
  res.render("Mhs/PinjamBuku", { title: "Login" });
});

router.get("/KembalikanBuku", function (req, res, next) {
  res.render("Mhs/KembalikanBuku", { title: "Login" });
});

router.get("/LihatBuku", function (req, res, next) {
  res.render("Mhs/LihatBuku", { title: "Login" });
});

router.get("/RiwayatPeminjaman", function (req, res, next) {
  res.render("Mhs/RiwayatPeminjaman", { title: "Login" });
});


router.get("/DashboardAdmin", function (req, res, next) {
  res.render("admin/DashBoardAdmin", { title: "Login" });
});

router.get("/DataBuku", async function (req, res, next) {
  const books = await crudController.fetchBooks();
  res.render("admin/DataBuku", { title: "Login", books: books });
});

router.post("/addBook", crudController.addBook);

router.get("/TambahBuku", async function (req, res, next) {
  const categories = await crudController.fetchCategories();
  res.render("admin/TambahBuku", { title: "Login", categories });
});

router.get("/EditBuku/:kode", async function (req, res, next) {
  const categories = await crudController.fetchCategories();
  const book = await crudController.fetchBook(req.params.kode);
  res.render("admin/EditBuku", { title: "Login", book, categories });
});

router.get("/KategoriBuku", async function (req, res, next) {
  const categories = await crudController.fetchCategories();
  res.render("admin/KategoriBuku", { title: "Login", categories });
});

router.get("/TambahKategori", function (req, res, next) {
  res.render("admin/TambahKategori", { title: "Login" });
});

router.get("/EditKategori/:id", async function (req, res, next) {
  const category = await crudController.fetchCategory(req.params.id);
  res.render("admin/EditKategori", { title: "Login", category });
});

router.get("/ProfileAdmin", function (req, res, next) {
  res.render("admin/ProfileAdmin", { title: "Login" });
});

router.get("/ListPeminjaman", function (req, res, next) {
  res.render("admin/ListPeminjaman", { title: "Login" });
});
module.exports = router;
