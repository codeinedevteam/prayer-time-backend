const { urlencoded } = require('express');
const express = require('express');
const config = require('./config');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const formidable = require('express-formidable')
const path =require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const bodyparser = require('body-parser')
const port = process.env.PORT || 4000


require('app-module-path').addPath(__dirname);
require('dotenv').config();

mongoose.connect('mongodb+srv://prayerdb:mahdi315201@prayerdb.4gbol.mongodb.net/prayerdb');

// const { port } = require('./config')

const app = express();
app.use(express.json())
app.use(bodyparser.json())



// app.use(formidable({
// 	encoding:'utf-8',
// 	uploadDir:path.join(__dirname,'./image'),
// 	multiples:true,
// 	keepExtensions:true
// }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// parse application/json
app.use(bodyParser.json())
app.use(urlencoded({ extended:false }));

global.config = require('./config');

app.use(express.static(__dirname + '/assets'));

app.use(
	session({
		secret: 'msng315201',
		resave: true,
		saveUninitialized: true,
		cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);



app.use('/', require('./Routes/index'));

app.listen(port, () => {
	console.log('server is running');
});
