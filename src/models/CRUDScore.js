const connection = require('../config/database');

const getListScores = async (filters) => {
    let sql = `
        SELECT s.id, u.name AS user_name, c.name AS class_name, s.score
        FROM Score s
        INNER JOIN User u ON s.user_id = u.id
        INNER JOIN Class c ON s.class_id = c.id
        WHERE 1=1
    `;

    const params = [];

    if (filters.user_id) {
        sql += ' AND s.user_id = ?';
        params.push(filters.user_id);
    }

    if (filters.class_id) {
        sql += ' AND s.class_id = ?';
        params.push(filters.class_id);
    }

    if (filters.sort === 'asc') {
        sql += ' ORDER BY s.score ASC';
    } else if (filters.sort === 'desc') {
        sql += ' ORDER BY s.score DESC';
    }

    let [results, fields] = await connection.query(sql, params);
    return results;
}

module.exports = {
    getListScores,
}