# VideoBelajar Backend - Edu Course API

REST API sederhana untuk website Edu Course (VideoBelajar), dibuat dengan Node.js, Express.js, dan PostgreSQL.
Ini adalah Mission 2 Backend, lanjutan dari Mission 1 (desain ERD).

---

## Tujuan

- Menghubungkan Node.js ke database PostgreSQL
- Membuat query DML: SELECT, INSERT, UPDATE, DELETE
- Membuat REST API (GET, POST, PATCH, DELETE)
- Menguji setiap endpoint dengan Postman

## Teknologi

| Teknologi | Fungsi |
|---|---|
| Node.js | Menjalankan JavaScript di server |
| Express.js | Membuat route/endpoint |
| PostgreSQL | Database |
| pg | Library penghubung Node.js ke PostgreSQL |
| dotenv | Menyimpan konfigurasi di file .env |
| nodemon | Server restart otomatis saat kode berubah |

## Struktur Folder

videobelajar-backend-be2/
├── database/
│   ├── schema.sql          -> struktur tabel
│   └── seed.sql            -> data awal
├── src/
│   ├── config/db.js        -> koneksi database
│   ├── services/           -> query SQL (SELECT, INSERT, UPDATE, DELETE)
│   ├── controllers/        -> mengatur request dan response
│   ├── routes/             -> daftar endpoint
│   └── app.js              -> pengaturan Express
├── server.js               -> titik masuk aplikasi
├── .env                    -> konfigurasi (JANGAN di-upload)
├── .env.example            -> contoh konfigurasi
└── package.json
Alur kerja: Request > Route > Controller > Service > Database > Response


## Tabel Database

tutor, kategori_kelas, produk_kelas (kelas/course), modul_kelas, material, pretest, kelas_saya, pesanan, pembayaran, ulasan.

Endpoint course memakai tabel produk_kelas, digabung dengan tutor dan kategori_kelas.

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /api/course | Tampilkan semua course |
| GET | /api/course/:id | Tampilkan satu course berdasarkan id |
| POST | /api/course | Tambah course baru |
| PATCH | /api/course/:id | Ubah data course berdasarkan id |
| DELETE | /api/course/:id | Hapus course berdasarkan id |


## Author

[Amala Al Fafan Karomi - 20012] - [Student of Harisenin.com FSD Bootcamp  ]