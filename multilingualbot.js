'use strict';
// load Byteball libraries
const conf = require('byteballcore/conf.js');
const eventBus = require('byteballcore/event_bus.js');
// useful to pause the terminal
const headlessWallet = require('headless-byteball');
const wallet = require('byteballcore/wallet.js');
const device = require('byteballcore/device.js');

//load modules
const i18n = require('./modules/i18nRDF');

// pairing initialization
eventBus.on (
	'paired', 
	function (from_address, pairing_secret) {
		device.sendMessageToDevice (
			from_address, 
			'text',
			i18n.getText('welcome') + i18n.getText('menu')
		);
	}
);

// process user requests
eventBus.on (
	'text', 
	function (from_address, text) {
		// change the interface language if asked by user
		var cmd = text;
		if (cmd.substring(0, cmd.indexOf('#')) === 'setLanguage') {
			if (conf.languages.includes(cmd.substring(cmd.lastIndexOf("#") + 1))) {
				i18n.setLanguage(cmd.substring(cmd.lastIndexOf("#") + 1));
				cmd = 'languageChanged';
			} else { cmd = 'unknownLanguage'; }
		} 
		// prepare message
		var preparedMessage = '';
		switch (cmd) {
			case 'main':
				preparedMessage = i18n.getText(cmd);
				break;
			case 'explain':
				preparedMessage = i18n.getText(cmd);
				break;
			case 'languages':
				preparedMessage = i18n.getText(cmd);
				break;
			case 'languageChanged':
				preparedMessage = i18n.getText(cmd);
				break;
			case 'unknownLanguage':
				preparedMessage = i18n.getText(cmd);
				break;
			default:
				preparedMessage = i18n.getText('unknownCmd');
		}
		// send message to user
		device.sendMessageToDevice (
			from_address, 
			'text',
			preparedMessage + i18n.getText('menu')
		);
		// free the memory
	}
);
