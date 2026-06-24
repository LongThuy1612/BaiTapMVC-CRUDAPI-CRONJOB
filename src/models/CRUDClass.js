const connection = require('../config/database');

const getListClasses = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Class');
    return results;
}

const getListClassId = async () => {
    let [results, fields] = await connection.query('SELECT id FROM Class');
    return results;
}

const createNewClass = async (name, description) => {
    let [rows, fields] = await connection.query('INSERT INTO Class(name, description) VALUES(?, ?)', [name, description]);
}

const getClassById = async (classId) => {
    let [results, fields] = await connection.query('SELECT * FROM Class WHERE id = ?', [classId]);
    let classA = results && results.length > 0 ? results[0] : {};
    return classA;
}

const updateClassById = async (classId, name, description) => {
    let [rows, fields] = await connection.query('UPDATE Class SET name = ?, description = ? WHERE id = ?', [name, description, classId]);
}

const deleteClassById = async (classId) => {
    let [rows, fields] = await connection.query('DELETE FROM Class WHERE id = ?', [classId]);
}

module.exports = {
    getListClasses,
    getListClassId,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById
}