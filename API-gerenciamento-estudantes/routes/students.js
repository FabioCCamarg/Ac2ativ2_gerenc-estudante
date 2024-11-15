const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.listarTodos); 

router.get('/:id', studentController.listarPorId); 


router.post('/', studentController.criarStudent);
router.put('/:id', studentController.editarStudent);
router.delete('/:id', studentController.deletarStudent);

module.exports = router;