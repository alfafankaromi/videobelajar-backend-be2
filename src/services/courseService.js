const pool = require('../config/db');

const getAllCourses = async () => {
  const result = await pool.query(
    `SELECT pk.*, t.nama AS nama_tutor, t.keahlian, kk.nama_kategori
     FROM produk_kelas pk
     LEFT JOIN tutor t ON pk.id_tutor = t.id_tutor
     LEFT JOIN kategori_kelas kk ON pk.id_kategori = kk.id_kategori
     ORDER BY pk.id_kelas`
  );
  return result.rows;
};

const getCourseById = async (id) => {
  const result = await pool.query(
    `SELECT pk.*, t.nama AS nama_tutor, t.keahlian, kk.nama_kategori
     FROM produk_kelas pk
     LEFT JOIN tutor t ON pk.id_tutor = t.id_tutor
     LEFT JOIN kategori_kelas kk ON pk.id_kategori = kk.id_kategori
     WHERE pk.id_kelas = $1`,
    [id]
  );
  return result.rows[0];
};

const createCourse = async (data) => {
  const { id_tutor, id_kategori, judul, deskripsi, harga, harga_coret, url_thumbnail, bahasa_pengantar } = data;

  const result = await pool.query(
    `INSERT INTO produk_kelas (id_tutor, id_kategori, judul, deskripsi, harga, harga_coret, url_thumbnail, bahasa_pengantar)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id_kelas`,
    [id_tutor, id_kategori, judul, deskripsi, harga, harga_coret || null, url_thumbnail || null, bahasa_pengantar || 'Bahasa Indonesia']
  );

  return getCourseById(result.rows[0].id_kelas);
};

const updateCourse = async (id, data) => {
  const existing = await getCourseById(id);
  if (!existing) {
    return null;
  }

  const { judul, deskripsi, harga, harga_coret, id_tutor, id_kategori, url_thumbnail, bahasa_pengantar } = data;

  await pool.query(
    `UPDATE produk_kelas
     SET judul = $1, deskripsi = $2, harga = $3, harga_coret = $4, id_tutor = $5, id_kategori = $6, url_thumbnail = $7, bahasa_pengantar = $8
     WHERE id_kelas = $9`,
    [
      judul ?? existing.judul,
      deskripsi ?? existing.deskripsi,
      harga ?? existing.harga,
      harga_coret ?? existing.harga_coret,
      id_tutor ?? existing.id_tutor,
      id_kategori ?? existing.id_kategori,
      url_thumbnail ?? existing.url_thumbnail,
      bahasa_pengantar ?? existing.bahasa_pengantar,
      id
    ]
  );

  return getCourseById(id);
};

const deleteCourse = async (id) => {
  const existing = await getCourseById(id);
  if (!existing) {
    return null;
  }

  await pool.query('DELETE FROM produk_kelas WHERE id_kelas = $1', [id]);
  return existing;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};