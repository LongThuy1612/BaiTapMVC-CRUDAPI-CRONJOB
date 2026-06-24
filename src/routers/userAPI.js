const express = require('express');
const { getListUsers, postCreateUser, getCreatePage, 
    getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser
 } = require('../controllers/userController');
const router = express.Router();

router.get('/', getListUsers);

router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);

router.post('/delete/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);

module.exports = router;