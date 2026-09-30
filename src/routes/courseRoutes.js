const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ success: false, message: 'ID harus berupa angka' });
  }
  next();
});

router.get('/', courseController.getList);
router.get('/:id', courseController.getDetail);
router.post('/', courseController.create);
router.patch('/:id', courseController.update);
router.delete('/:id', courseController.remove);

module.exports = router;