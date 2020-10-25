module.exports = {

	// compose Flash Messages for Materialize CSS
	composeFlashM: function(flashMsg) {
		let types = Object.keys(flashMsg);
		let userMessages = [];
		let message = {};
		if (types.length !== 0) {
			types.forEach(type => {
				switch (type) {
				case 'success':
					message = {
						msg: flashMsg[type],
						icon: 'check_circle_outline',
						cardColor: 'green',
						textColor: 'green-text'
					};
					break;
				case 'error':
					message = {
						msg: flashMsg[type],
						icon: 'error',
						cardColor: 'red',
						textColor: 'red-text'
					};
					break;
				case 'warning':
					message = {
						msg: flashMsg[type],
						icon: 'warning',
						cardColor: 'yellow',
						textColor: 'yellow-text'
					};
					break;
				case 'info':
					message = {
						msg: flashMsg[type],
						icon: 'notifications',
						cardColor: 'blue',
						textColor: 'blue-text'
					};
					break;
				}
				userMessages.push(message);
			});
			return userMessages;
		}
	},

	// compose Flash Messages for Bootstrap 4
	composeFlashBS: function(flashMsg) {
		let types = Object.keys(flashMsg);
		let userMessages = [];
		let message = {};
		if (types.length !== 0) {
			types.forEach(type => {
				switch (type) {
				case 'success':
					message = {
						msg: flashMsg[type],
						alert: 'alert-success',
						icon: 'fas fa-check',
					};
					break;
				case 'danger':
					message = {
						msg: flashMsg[type],
						alert: 'alert-danger',
						icon: 'fas fa-exclamation-triangle',
					};
					break;
				case 'warning':
					message = {
						msg: flashMsg[type],
						alert: 'alert-warning',
						icon: 'fas fa-exclamation',
					};
					break;
				case 'info':
					message = {
						msg: flashMsg[type],
						alert: 'alert-info',
						icon: 'fas fa-info',
					};
					break;
				}
				userMessages.push(message);
			});
			return userMessages;
		}
	}
};
