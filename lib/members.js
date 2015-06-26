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
		}
	},
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Team'
	},
	image: {
		type: String,
		default: 'images/user.png'
	},
	address: {
		lines: {
			type: [String]
		},
		city: {
			type: String
		},
		state: {
			type: String
		},
		zip: { 
			type: Number
		}
	}
});

module.exports = mongoose.model('Member', MemberSchema);