const jxt = require("jsonwebtoken");
const { model } = require("mongoose");
const { use } = require("../routes/auth.routes");

const middleware = {
	verifytoken: (req, res, next) => {
		const token = req.headers.token;
		if (token) {
			//Bearer 123456
			const accessToken = token.split(" ")[1];
			jxt.verify(accessToken, "secrekey", (err, user) => {
				if (err) {
					res.status(403).json("token is not valid");
				}
				req.user = user;
				next();
			});
			
		} else {
			res.status(403).json("you are not authenticated")
		}
	},
	middlewareController: (req, res,next) => {
		middleware.verifytoken(req, res, () => {
			if (req.user.id === req.params.id || req.user.admin) {
				next()
			}
			else {
				res.status(403).json("you are not allowed to delete others")
			}
		}
	)}


}

module.exports = middleware;
