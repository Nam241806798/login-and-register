
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const Apipost = require("./src/routes/auth.routes");
const user = require("./src/routes/user.reoutes")
const mongoose = require('mongoose');

app.use(cors());
app.use(morgan('combined'));
app.use(cookieparser());
app.use(express.json());
dotenv.config()
app.use('/api', Apipost);
app.use('/client', user);
mongoose.connect('mongodb+srv://hoangnam1:Nam17031998@cluster0.b7tm1.mongodb.net/hello?retryWrites=true&w=majority', () => {
	console.log('success');
	app.listen(8000, () => console.log(`running in ${8000}`))
});








