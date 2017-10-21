var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SillysecretSchema = Schema({
    name: {type: String, required: true, min: 3, max: 30},
    details: {type: String, required: true, min: 3, max: 100}
});

module.exports = mongoose.model('Sillysecret', SillysecretSchema);