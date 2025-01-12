# Backend: Aplikasi Pencarian Lokasi Barang di Gudang

Backend untuk mendukung aplikasi pencarian lokasi barang di gudang. Berfungsi sebagai API server untuk mengelola data barang, lokasi, dan autentikasi admin.

## Fitur

- API Pencarian Barang: Pencarian barang berdasarkan nomor lot batch.
- CRUD Barang: Menambah, mengedit, dan menghapus data barang (hanya untuk admin).
- Pengelolaan Lokasi: Menyimpan dan mengelola lokasi barang pada peta gudang.
- Autentikasi Admin: Login berbasis JWT untuk keamanan endpoint yang bersifat sensitif.

## Teknologi yang Digunakan

Framework: Express.js
Database: MySQL
Autentikasi: JSON Web Token (JWT)
Lingkungan: Node.js

## Instalasi

### Prasyarat

- Node.js dan npm harus terpasang.
- Database MySQL sudah dikonfigurasi.

### Repo

[git clone https://github.com/rizkycahyaz/backend_warehouse.git](https://github.com/rizkycahyaz/backend_warehouse.git)

bash
Copy code
cd backend_warehouse

### Jalankan aplikasi:

nodemon npm start
Server akan berjalan di http://localhost:3000.

### Catatan

Pastikan server backend berjalan sebelum mengakses aplikasi frontend.

Penjelasan: utils/calculateCoordinate.js
File ini berisi fungsi untuk menghitung koordinat lokasi barang pada peta berdasarkan kolom dan baris. Fungsi ini digunakan untuk mengonversi posisi barang (berbasis grid) ke koordinat piksel pada peta kustom.

# Penjelasan

## Input:

kolom: Nomor kolom dalam format string (misalnya, "01", "02").

baris: Huruf baris dalam format string (misalnya, "A", "B").

## Proses:

Menghitung lebar kolom (kolomWidth) dan tinggi baris (barisHeight) berdasarkan ukuran peta.

Mengonversi baris (huruf) dan kolom (angka) ke indeks numerik.

Menggunakan indeks tersebut untuk menghitung koordinat x dan y berdasarkan posisi tengah setiap grid.

## Output:

Objek berisi koordinat { x, y } dalam piksel.

Mengembalikan null jika input berada di luar batas grid (1-27 untuk kolom, A-J untuk baris).
