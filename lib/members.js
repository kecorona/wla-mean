var memberDb = require('./members.json');

exports.getMembers = getMembers;
exports.getMember = getMember;

function getMembers(callback) {
	setTimeout(function {
		callback(null, employeeDb);
	}, 1000);
}


function getMember(memberId, callback) {
    getMembers(function (error, data) {
    	if (error) {
    		return callback(error);
    	}

    	var result = data.find(function(item) {
    		return item.id == memberId;
    	});

    	callback(null, result);
    });
}