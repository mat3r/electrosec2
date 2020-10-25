const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	company: {
		type: String
	},
	message: {
		type: String,
		require: true
	},
	date: {
		type: Date
	}
});

module.exports = mongoose.model('Contact', contactSchema);
