const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config()



const form = (req, res) => {
  const token = req.cookies.token;

  res.render("login1", { title: "Express" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Menggunakan nama variabel lain untuk menyimpan hasil pencarian user
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    // Buat token JWT
    const token = jwt.sign(
      { id: foundUser.id,
        email: foundUser.email,
        nama: foundUser.nama,
        departement: foundUser.departement,
        role: foundUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    const data = {
      email: foundUser.email,
        nama: foundUser.nama,
        departement: foundUser.departement,
        role: foundUser.role}
      
    // Set cookie dengan token
    res.cookie("token", token, { httpOnly: true });



    // Redirect ke halaman sesuai dengan peran pengguna
    if (foundUser.role === "mahasiswa") {
      // return res.render("layouts/showProfile", { data })
      return res.redirect("/dashboardMhs")
    } else if (foundUser.role === "admin") {
      // return res.redirect("/layouts/showProfile");
      // return res.render("layouts/showProfile", { data })
      return res.redirect("/DashboardAdmin")
    }
    console.log(foundUser.role)
    // Jika tidak ada peran yang cocok, berikan respons standar
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Cari pengguna berdasarkan userId
    const user = await User.findOne(req.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Periksa apakah password saat ini cocok
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    // Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Perbarui password pengguna di database
    await user.update({ password: hashedNewPassword });
    return res.redirect("/dashboard");
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = {
  form,
  checklogin,
  logout,
  changePassword,
};
