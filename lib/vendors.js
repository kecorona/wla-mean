var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});