const connection = require("../config/database");

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM User');
    return results;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query('SELECT * FROM User where id = ?', [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const createNewUser = async (name, email, city) => {
    let sql = `INSERT INTO User(name, email, city) VALUES('${name}', '${email}', '${city}')`;
    let [rows, fields] = await connection.query(sql);
}

const updateUserById = async (userId, name, email, city) => {
    let sql = `UPDATE User SET name = '${name}', email = '${email}', city = '${city}' WHERE id = ${userId}`;
    let [rows, fields] = await connection.query(sql);
}

const deleteUserById = async (userId) => {
    let sql = `DELETE FROM User WHERE id = ${userId}`;
    let [rows, fields] = await connection.query(sql);
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById
}