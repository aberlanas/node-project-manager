const model = require('../model/pm_manager.model');

exports.isValidUser = async (req, res) => {
	const connection = await model.getConnection();
    const user = req.body;
    console.log(user);
    res.send(user);
};
