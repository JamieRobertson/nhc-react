/**
 * Here is an API to serve updates on NHC twitter news and Transport news
 * 
 */

const express 		= require('express');
const mongoose 		= require('mongoose');
const schema 		= require('./db/schema.js');
const path 			= require('path');
const bodyParser 	= require('body-parser');


// Set port
let port = process.env.PORT || 3000;

// Configure Express
let app 	= express(), 
	router 	= express.Router();

// Configure MongoDB
mongoose.connect('mongodb://localhost/nhc');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!');
});

// Calculate offsets for markers
function calculateOffsets() {
	let lon = this.coords[0];
	console.log(lon);
}

schema.soundsystemSchema.methods.calculateOffsets = calculateOffsets.bind(this);

// Define model
let Soundsystem = mongoose.model('Soundsystem', schema.soundsystemSchema);
let Station = mongoose.model('Station', schema.stationSchema);


// Serve our API from here
app.get('/api', function (req, res) {
	res.set('Content-Type', 'application/json');
	res.json({ message: 'hooray! welcome to our api!' });
	let s = Soundsystem.find({}, {'_id': 0});

	// if (s != undefined) {
		console.log(s)
		// res.json({'soundsystems': JSON.stringify(s)})
	// }

	// Soundsystem.find({}, {'_id': false}, function(err, doc) {
	// 	if (doc) {
	// 		res.json({'soundsystems': doc})
	// 	} else { console.log(err) }
	// });
});

// Serve our web app from here
app.get('/', function (req, res) {
	res.send('Hello World!');
	// res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
