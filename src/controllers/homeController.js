const connection = require('../config/database');
const { getAllUsers, getUserById, createNewUser, 
  updateUserById, deleteUserById } = require('../services/CRUDService');

const getHomePage = async (req, res) => {
  let results = await getAllUsers();
  return res.render('homePage.ejs', { dataUser: results });
}

const postCreateUser = async (req, res) => {
  let { name, email, city } = req.body;

  await createNewUser(name, email, city);
  // res.send('Create user successfully!');
  res.redirect('/');
}

const postUpdateUser = async (req, res) => {
  let { id, name, email, city } = req.body;

  await updateUserById(id, name, email, city);

  // res.send('Update user successfully!');
  res.redirect('/');
}

const postDeleteUser = async (req, res) => {
  res.render('delete', { user: await getUserById(req.params.id) });
}

const getCreatePage = (req, res) => {
  res.render('create');
}

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('edit', { user: user });
}

const postHandleRemoveUser = async (req, res) => {
  const userId = req.body.id;
  await deleteUserById(userId);
  res.redirect('/');
}

module.exports = {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser
}