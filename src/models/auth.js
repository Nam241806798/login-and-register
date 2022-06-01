const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 5,
		maxlength:50,
		required: true,
		unique:true
	},
	password: {
		type: String,
		minlength: 6,
		required:true
	},
	email: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 100,
		unique:true
	},
	admin: {
		type: Boolean,
		default:false
	}

},{timestamps:true});


module.exports = mongoose.model("auth",AuthSchema)



