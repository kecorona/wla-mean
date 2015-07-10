var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Member = mongoose.model('Member');
var BusinessLine = mongoose.model('BusinessLine');

var data = {
	members: [
	{
		id: '000001',
		name: {
			first: 'Montgomery',
			last: 'Burns'
		},
		image: 'images/members/000001.png',
		address: {
			lines: ['1000 Mammon Lane', '(Mammon Lane)'],
			city: 'Springfield',
			state: 'IL',
			zip: 22617
		}
	},
	{
		id: '000002',
		name: {
			first: 'Homer',
			last: 'Simpson'
		},
		image: 'images/members/000002.png',
		address: {
			lines: ['742 Evergreen Terrace', '(Evergreen Terrace)'],
			city: 'Springfield',
			state: 'IL',
			zip: 22617
		}
	},
	{
		id: '000003',
		name: {
			first: 'Homer',
			last: 'Simpson'
		},
		image: 'images/members/000003.png',
		address: {
			lines: ['742 Evergreen Terrace', '(Evergreen Terrace)'],
			city: 'Springfield',
			state: 'IL',
			zip: 22617
		}	
	}]
}