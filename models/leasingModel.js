var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tenantSchema = new Schema({
	'name': {
		type: String,
		required: true,
	},
    'description': {
        type: String
    },
	'created': {
		type: Date,
		default: Date.now
	},
	'expiry': {
		type: Date,
		default: Date.now
	},
	'providerId': {
		type: Schema.Types.ObjectId,
		required: true,
	},
	'borrowerId': {
		type: Schema.Types.ObjectId,
		required: true,
		default: null
	},

	'price': {
		type: Number
	}
});

module.exports = mongoose.model('item', tenantSchema);