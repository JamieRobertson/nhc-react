const mongoose 		= require('mongoose');

exports.soundsystemSchema = mongoose.Schema({
    name: String, 
    type: String, 
    description: String, 
    coords: Array
});

exports.stationSchema = mongoose.Schema({
    name: String,
    lines: [ String ],
    type: String, 
    description: String,
    coords: [ Number ]
});