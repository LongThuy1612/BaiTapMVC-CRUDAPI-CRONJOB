const { getListScores } = require('../models/CRUDScore');
const { getListClassId } = require('../models/CRUDClass');
const { getListUserId } = require('../models/CRUDUser');

const getAllScoreController = async (req, res) => {
    const { user_id, class_id, sort } = req.query;
    let dataScore = await getListScores({ user_id, class_id, sort });
    return res.render('listScore', { dataScore, user_id, class_id, sort });
}

const getCreatePage = async (req, res) => {
    const listUserId = await getListUserId();
    const listClassId = await getListClassId();

    return res.render('createScore', { listUserId, listClassId})
}

const postCreateScore = async (req, res) => {
    res.send('oki');
}

module.exports = {
    getAllScoreController,
    getCreatePage,
    postCreateScore
}