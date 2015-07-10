var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MemberSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
		}
	},
	businessLine: {
		type: Schema.Types.ObjectId,
		ref: 'BusinessLine'
	},
	image: {
		type: String,
		default: 'images/member.png'
	},
	address: {
		lines: {
			type: [String]
		},
		city: {
			type: String
		},
		zip: {
			type: Number
		}
	}
});

module.exports = mongoose.model('Member', MemberSchema);