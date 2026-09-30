const courseService = require('../services/courseService');

const getList = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { id_tutor, id_kategori, judul, harga } = req.body || {};
if (!id_tutor || !id_kategori || !judul || harga === undefined) {      return res.status(400).json({
        success: false,
        message: 'id_tutor, id_kategori, judul, dan harga wajib diisi'
      });
    }

    const course = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        message: 'id_tutor atau id_kategori tidak ditemukan'
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body || {});
    if (!course) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        message: 'id_tutor atau id_kategori tidak ditemukan'
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Kelas berhasil dihapus' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({
        success: false,
        message: 'Kelas tidak bisa dihapus karena masih dipakai data lain (modul, pesanan, dll)'
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  remove
};