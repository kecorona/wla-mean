var mongoose = require('mongoose');
var Member = mongoose.model('Member');

exports.getMembers = getMembers;
exports.getMember = getMember;

function getMembers(callback) {
    Member.find().sort('name.last').exec(callback);
}


function getMember(memberId, callback) {
    Member.findOne({
        id: memberId
    }).populate('businessLine').exec(callback);
}

