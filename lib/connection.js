var mongoose = require('mongoose');
var dbUrl = 'mongodb://admin:admin@ds041841.mongolab.com:41841/heroku_3pmxr98k';

mongoose.connect(dbUrl);

// Close the Mongoose connection on Ctrl-C
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Default Mongoose connection discovered');
		process.exit(0)
	});
});

require('../models/member');
require('../models/businessLine');
// require('../models/vendor');