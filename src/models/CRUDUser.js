const connection = require("../config/database");

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM User');
    return results;
}

const getListUserId = async () => {
    let [results, fields] = await connection.query('SELECT id FROM User');
    return results;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query('SELECT * FROM User where id = ?', [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const createNewUser = async (name, email, city) => {
    let [rows, fields] = await connection.query('INSERT INTO User(name, email, city) VALUES(?, ?, ?)', [name, email, city]);
}

const updateUserById = async (userId, name, email, city) => {
    let [rows, fields] = await connection.query('UPDATE User SET name = ?, email = ?, city = ? WHERE id = ?', [name, email, city, userId]);
}

const deleteUserById = async (userId) => {
    let [rows, fields] = await connection.query('DELETE FROM User WHERE id = ?', [userId]);
}

module.exports = {
    getAllUsers,
    getListUserId,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById
}