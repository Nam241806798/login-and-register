const AuthSchema = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
	// Register a username

const postUser = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(req.body.password, salt);
		const newUser = await new AuthSchema({
			username: req.body.username,
			password: hashed,
			email: req.body.email
		});
		const user = await newUser.save();
		res.status(200).json({ user })
	}
	catch (err) {
		res.status(500).json(err)
	}
};
let refreshtokens = [];
	// login username
const login= async (req, res) => {
	try {
		const user = await AuthSchema.findOne({ username: req.body.username });
		if (!user) { res.status(404).json("wrong username") };
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (!validPassword) {
			res.status(404).json('wrong password')
		}
		
		if (user && validPassword) {
			// accessToken
			
			const accessToken = jwt.sign({
				id: user.id,
				admin: user.admin
			}, "secrekey", { expiresIn: "3m" })

			//refreshtoken
			const refreshtoken = jwt.sign({
				id: user.id,
				admin: user.admin
			}, "secrekey", { expiresIn: "1d" });
			if (!refreshtoken) {
				return res.status(403).json("you are note authenticated")
			}
			if (!refreshtokens.includes(refreshtoken)) {
				return res.status(403).json("you are not valid")
			}
			refreshtoken = refreshtoken.filter((token) => token !== refreshtoken)
			refreshtokens.push(refreshtoken);
			res.cookie("refreshtoken", refreshtoken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite:"strict"
			})
			
			const { password, ...others } = user._doc;

			res.status(200).json({...others,jwt:accessToken});	
		}
		
	} catch (error) {
		res.status(500).json(error)
	}
}




module.exports ={postUser,login}; 