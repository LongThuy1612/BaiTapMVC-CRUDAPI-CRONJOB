const { getListClasses, createNewClass, getClassById, updateClassById, deleteClassById } = require('../models/CRUDClass');

const getAllClassesController = async (req, res) => {
    let results = await getListClasses();
    return res.render('listClass', { dataClass: results });
}

const postCreateClass = async (req, res) => {
  let { name, description } = req.body;

  await createNewClass(name, description);
  res.redirect('/class');
}

const getCreatePage = (req, res) => {
  res.render('createClass');
}

const postUpdateClass = async (req, res) => {
  let { id, name, description } = req.body;

  await updateClassById(id, name, description);

  // res.send('Update user successfully!');
  res.redirect('/class');
}

const postDeleteClass = async (req, res) => {
  res.render('deleteClass', { classA: await getClassById(req.params.id) });
}

const getUpdatePage = async (req, res) => {
  const classId = req.params.id;
  let classA = await getClassById(classId);
  res.render('editClass', { classA: classA });
}

const postHandleRemoveClass = async (req, res) => {
  const classId = req.body.id;
  await deleteClassById(classId);
  res.redirect('/class');
}

module.exports = {
    getAllClassesController,
    postCreateClass,
    getCreatePage,
    getUpdatePage,
    postUpdateClass,
    postDeleteClass,
    postHandleRemoveClass
}