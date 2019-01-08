var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tenantSchema = new Schema({
	'item': {
		type: Schema.Types.ObjectId,
		required: true,
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
});

module.exports = mongoose.model('borrowEntry', tenantSchema);