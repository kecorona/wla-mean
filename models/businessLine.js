var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;
var BusinessLineSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	members: {
		type: [Schema.Types.Mixed]
	},
});

function _attachMembers (Member, result, callback) {
	Member.find({
		team: result._id
	}, function (error, members) {
		if (error) {
			return callback(error);
		}
		result._members = members;
		callback(null, result)
	});
}

// listen for find and findOne
BusinessLineSchema.plugin(postFind, {
	find: function (result, callback) {
		var Member = mongoose.model('Member');

		async.each(result, function (item, callback) {
			_attachMembers(Member, item, callback);
		}, function (error) {
			if (error) {
				return callback(error);
			}

			callback(null, result)
		});
	},
	findOne: function (result, callback) {
		var Member = mongoose.model('Member');

		_attachMembers(Member, result, callback);
	}
});

module.exports = mongoose.model('BusinessLine', BusinessLineSchema);