var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	contact: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String, 
			required: true
		},
		phone: {
			type: String
		},
		email: {
			type: String
		}
	}
});

module.exports = mongoose.model('Vendor', VendorSchema);