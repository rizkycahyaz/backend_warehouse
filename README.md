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

cd backend_warehouse

### Jalankan aplikasi:

nodemon npm start
Server akan berjalan di http://localhost:3000.

## Dokumentasi API

### Authentication API

- Login
  URL: /api/auth/login
  Method: POST
  Deskripsi: Authentikasi dan generate token.
- Register
  URL: /api/auth/register
  Method: POST
  Description: Register user baru.

### Item API

- Create Item
  URL: /api/items/create
  Method: POST
  Description: menambah item.
- Get All Items
  URL: /api/items
  Method: GET
  Description: memanggil semua item.
- Get Item Details
  URL: /api/items/detail/:lot_batch_no
  Method: GET
  Description: Mengambil detail item tertentu berdasarkan lot_batch_no nya.
- Update Item
  URL: /api/items/:lot_batch_no
  Method: PUT
  Description: Update item.
- Delete Item
  URL: /api/items/delete/:lot_batch_no
  Method: DELETE
  Description: Delete item berdasarkan lot_batch_no.

### Location API

- Add Location
  URL: /api/locations/add
  Method: POST
  Description: Menambah lokasi.
- Get All Locations
  URL: /api/locations
  Method: GET
  Description: mengambil semua lokasi.
- Search Location by Lot/Batch Number
  URL: /api/locations/search
  Method: POST
  Description: Mencari lokasi berdasarkan lot_batch_no.

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
