const globals = require('../globals.js');
const path = require('path');

const commands = {
	uploadFiles(index) {
		return this
			.waitForElementPresent('@appropriationsUpload')
			.setValue('@appropriationsUpload', path.resolve(__dirname, '../uploads', globals.files[index].appropriations))
			.setValue('@programActivityUpload', path.join(__dirname, '../uploads', globals.files[index].programActivity))
			.setValue('@awardFinancialUpload', path.join(__dirname, '../uploads', globals.files[index].awardFinancial))
			.setValue('@derivativeUpload', path.join(__dirname, '../uploads', globals.files[index].derivative))
			.setValue('@nonDerivativeUpload', path.join(__dirname, '../uploads', globals.files[index].nonDerivative))
			.setValue('@awardUpload', path.join(__dirname, '../uploads', globals.files[index].award));
	}
}


module.exports = {
	url: () => { 
		return globals.baseUrl + '#/addData'; 
	},
	commands: [commands],
	elements: {
		header: {
			selector: "div.usa-da-page-title"
		},
		appropriationsUpload: {
			selector: "div[data-testid='upload-appropriations'] input"
		},
		programActivityUpload: {
			selector: "div[data-testid='upload-program_activity'] input"
		},
		awardFinancialUpload: {
			selector: "div[data-testid='upload-award_financial'] input"
		},
		awardUpload: {
			selector: "div[data-testid='upload-award'] input"
		},
		derivativeUpload: {
			selector: "div[data-testid='upload-derivative'] input"
		},
		nonDerivativeUpload: {
			selector: "div[data-testid='upload-non_derivative'] input"
		},
		uploadButton: {
			selector: "button[data-testid='upload']"
		}
	}
}