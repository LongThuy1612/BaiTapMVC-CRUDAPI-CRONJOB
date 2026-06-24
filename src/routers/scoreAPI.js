const express = require('express');
const { getAllScoreController, getCreatePage, postCreateScore } = require('../controllers/scoreController');
const router = express.Router();

router.get('/', getAllScoreController);

router.get('/create', getCreatePage);
// router.get('/update/:id', getUpdatePage);

router.post('/create-class', postCreateScore);
// router.post('/update-user', postUpdateUser);

// router.post('/delete-user/:id', postDeleteUser);
// router.post('/delete-user', postHandleRemoveUser);

module.exports = router;