const express = require('express');
const { getAllClassesController, getCreatePage, postCreateClass, getUpdatePage, postUpdateClass, postDeleteClass, postHandleRemoveClass } = require('../controllers/classController');
const router = express.Router();

router.get('/', getAllClassesController);

router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

router.post('/create-class', postCreateClass);
router.post('/update-class', postUpdateClass);

router.post('/delete/:id', postDeleteClass);
router.post('/delete-class', postHandleRemoveClass);

module.exports = router;