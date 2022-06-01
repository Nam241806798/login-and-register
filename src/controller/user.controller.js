const AuthSchema = require('../models/auth');


	
const getUser = async (req, res) => {
	try {
		const user = await AuthSchema.find();
		
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json(err)
	}
	}
const deleteUser= async (req, res) => {
	try {
		await AuthSchema.findByIdAndDelete(req.params.id);
		res.status(200).json('delete Success');
	} catch (error) {
		res.status(500).json(err)
	}
}


module.exports = 
	{getUser , deleteUser}



