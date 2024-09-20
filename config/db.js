let mysql = require('mysql'); // import library mysql
// membuat variable connection yang isinya konfigurasi dari koneksi database mysql
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'warehouselocator',
});

// membuat kondisi untuk melihat apakah koneksi berjalan atau tdak
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Koneksi berhasil');
  }
});
// export module connection agar bisa digunakan difile lain
module.exports = connection;