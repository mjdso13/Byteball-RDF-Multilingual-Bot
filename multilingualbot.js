'use strict';
// load Byteball libraries
const conf = require('byteballcore/conf.js');
const eventBus = require('byteballcore/event_bus.js');
// useful to pause the terminal
const headlessWallet = require('headless-byteball');
const wallet = require('byteballcore/wallet.js');
const device = require('byteballcore/device.js');

//load modules
const i18nRDF = require('./modules/i18nRDF');
const utils = require('./modules/utils');

// pairing initialization
eventBus.on (
	'paired', 
	function (from_address, pairing_secret)  {
		// set initial language interface
		i18nRDF.setLanguage(conf.default_language, from_address);
		// send welcome message to user
		device.sendMessageToDevice (
			from_address, 
			'text',
			i18nRDF.getText('welcome', from_address) + 
				i18nRDF.getText('menu', from_address) // add menu 
		);
	}
);

// process user requests
eventBus.on (
	'text', 
	function (from_address, text) {
		// copy text content to rewrite it
		var cmd = text;

		// test if it's a parametric command 
		if (utils.isParametricRequest(cmd)) {
			switch (utils.getCmd(cmd)) { // switch based on main command
				case 'setLanguage' :  // if user want change the interface language 
					// test if language is available with the parameter
					if (i18nRDF.availableLanguages(utils.getParameter(cmd))) {
						// set the language interface
						i18nRDF.setLanguage(utils.getParameter(cmd), from_address);
						// adapt command
						cmd = 'languageChanged';
					} else {  // if language isn't available, adapt the command
						cmd = 'unknownLanguage';
						}
					break;
					// add more cases of parametric commands here
				default : // if it's not a valid command
					cmd = 'unknownCmd';
			}
		}

		// prepare message
		var preparedMessage = '';
		switch (cmd) {
			case 'main':
				preparedMessage = i18nRDF.getText(cmd, from_address);
				break;
			case 'explain':
				preparedMessage = i18nRDF.getText(cmd, from_address);
				break;
			case 'languages':
				preparedMessage = i18nRDF.getText(cmd, from_address);
				break;
			case 'languageChanged':
				preparedMessage = i18nRDF.getText(cmd, from_address);
				break;
			case 'unknownLanguage':
				preparedMessage = i18nRDF.getFormatted( // format variable text
					i18nRDF.getText(cmd, from_address), // get command text
					[utils.getParameter(text)] // extract & forward parameters array
				);
				break;
			// add your new sentence here
			default:
				preparedMessage = i18nRDF.getFormatted( // format variable text
					i18nRDF.getText("unknownCmd", from_address), // get command text
					[utils.getParameter(text)] // extract & forward parameters array
				);
		}

		// send message to user
		device.sendMessageToDevice (
			from_address, 
			'text',
			preparedMessage + i18nRDF.getText('menu', from_address)
		);
		// help GC to free allocated memory faster 
		cmd = ''; preparedMessage = '';
	}
);
