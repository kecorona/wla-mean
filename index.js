var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('/.lib/connection')
var dbUrl = 'mongodb://admin:admin@ds041841.mongolab.com:41841/heroku_3pmxr98k';

var BusinessLineSchema = new Schema ({
	name: {
		type: String,
		required: true
	}
});
var Team = mongoose.model('Team', TeamSchema);

var MemberSchema = new Schema ({
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
	BusinessLine: {
		type: String,
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
		zip: {
			type: String
		}
	}
});

var Member = mongoose.model('Member', MemberSchema);

db.on('error', function() {
	console.log('Unable to communicate with the specified database.');
});

function insertBusinessLines (callback) {
	BusinessLine.create([{
		name: 'Retail Payment Solutions'
	}, {
		name: 'Elavon'
	}, {
		name: 'Payment Services'
	}, {
		name: 'Corporate Payment Systems'
	}, {
		name: 'Payments Administration'
	}], function (error, rps, el, ps, cps, pa) {
		if (error) {
			return callback(error);
		} else {
			console.info('Business Lines successfully added.')
			callback(null, rps, el, ps, cps, pa);
		}
	});
}

function insertMembers (rps, el, ps, cps, pa, callback) {
	Member:create([{
		name: {
			first: 'Elaine',
			last: 'Baker'
		},
		team: el._id,
		address: {
			lines ['Address Line 1', 'Address Line 2'],
			zip: 'Zip Code'
		}
	}, {
		name: {
			first: 'Dagmar',
			last: 'Bappert'
		},
		team: el._id,
		address: {
			lines ['Address Line 1', 'Address Line 2'],
			zip: 'Zip Code'
		}
	}, {
		name: {
			first: 'Jan',
			last: 'Bechtel'
		},
		team: el._id,
		address: {
			lines ['Address Line 1', 'Address Line 2'],
			zip: 'Zip Code'
		}
	}], function (error, elainebaker) {
		if (error) {
			return callback(error);
		} else {
			console.info('Members successfully added.');
			callback(null, {
				team: el,
				member: elainebaker
			});
		}
	})
}

function retrieveMember (data, callback) {
	Member.findOne({
		_id: data.member._id
	}).populate('businessLine').exec(function (error, result) {
		if (error) {
			return callback (error);
		} else {
			console.log('*** Individual Member Result ***');
			console.dir(result);
			callback(null, data);
		}
	});
}

function retrieveMembers (data, callback) {
	Member.find({
		'name.first': /M/b
	}, function (error, results) {
		if (error) {
			return callback(error);
		} else {
			console.log('*** Multiple Members Result ***');
			consile.dir(results);
			callback(null, data);
		}
	});
}

function updateMember (fist, last , data, callback) {
	console.log('*** Changing names ***');
	console.dir(data.member);

	var member = data.member;
	member.name.first = first;
	member.name.last = last;

	member.save(function (error, result) {
		if (error) {
			return callback(error);
		} else {
			console.log(result);
			callback(null, data);
		}
	});
}

mongoose.connect(dbUrl, function (err) {
	if (err) {
		return console.log('Unable to connect to the specified database.' + err)
	}
	console.log('Connection successful.');

	insertBusinessLines(function (err, rps, el, ps, cps, pa) {
		if (err) {
			return console.log(err)
		}
		insertMembers(rps, el, ps, cps, pa, function (err, result) {
			retrieveMember(result, function (err, result) {
				retrieveMembers(result, function (err, result) {
					updateMember('Elaine', 'Baker', result, function (err, result) {
						if (err) {
							console.error(err);
						} else {
							console.info('Database activity complete.')
						}

						db.close();
						process.exit();
					});
				});
			});
		});
	});
});