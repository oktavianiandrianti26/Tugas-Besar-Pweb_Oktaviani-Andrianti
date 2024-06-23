const User = require('../models/password');

exports.resetPassword = (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  // Cek apakah email terdaftar di database
  User.getUserByEmail(email, (user) => {
    if (user.length > 0) {
      // Cek apakah password lama benar
      if (oldPassword === user[0].password) {
        // Cek apakah password baru dan konfirmasi password sama
        if (newPassword === confirmPassword) {
          // Update password baru ke database
          User.updatePassword(email, newPassword, (result) => {
            if (result.affectedRows > 0) {
              res.send('Password berhasil diubah.');
            } else {
              res.send('Password gagal diubah.');
            }
          });
        } else {
          res.send('Password baru dan konfirmasi password tidak sama.');
        }
      } else {
        res.send('Password lama salah.');
      }
    } else {
      res.send('Email tidak terdaftar.');
    }
  });
};