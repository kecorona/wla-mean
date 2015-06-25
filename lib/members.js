var memberDb = require('../database/members');

exports.getMembers = getMembers;
exports.getMember = getMember;

function getMember (callback) {
	setTimeout(function () {
		callback(null, memberDb);
	}, 500);
}

function getMember (memberId, callback) {
	getMembers(function (error, data) {
		if (error) {
			return callback(error);
		}

		var result = data.find(function(item) {
			return item.id === memberId;
		});

		callback(null, result);
	});
}