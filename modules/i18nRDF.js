'use strict';
// load libraries
const rdf = require('rdflib');
const path = require ('path');
const fs = require('fs');

// load module functions
const rdfTriples = require('./RDFTriples');

// variables
var language = 'en';
var botMessageLabels = [];
var botmessageTexts = [];

// rdf file variables
// rdf document uri
var documentUri = 'https://github.com/n-ric-v/Byteball-RDF-Multilingual-Bot/blob/master/rdf/botmessages.rdf';

// rdf document mymetype 
var mimeType = 'application/rdf+xml';

// RDF-Schema namespace
var RDFS = rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");

// initialize the graph for the data model
var graphDataModel = rdf.graph();

// read the RDF file
var rdfDocument = fs.readFileSync(
	path.join (
		__dirname, 
		'..', 
		'rdf/botmessages.rdf'
	), 
	'utf8'
);

// parse the rdf with bot messages
try {
	rdf.parse (
		rdfDocument, 
		graphDataModel, 
		documentUri, 
		mimeType
	);
} catch (err) {
    console.log(err)
}

// load bot message labels
botMessageLabels = rdfTriples.getSubjectValue (
	graphDataModel.statementsMatching (
		undefined, 
		RDFS('label'), 
		undefined
	)
);

// function to prepare bot messages
function prepareBotMessages () {
	// load translated bot messages
	var tmpBotMessage = rdfTriples.getObjectValue (
		graphDataModel.statementsMatching (
			undefined, 
			RDFS('value'), 
			undefined
		),
		language
	);
	// store the bot messages with its labels as array id
	for (var i = 0; i < tmpBotMessage.length; i++) {
			botmessageTexts[botMessageLabels[i]] = tmpBotMessage[i];
	}
}
// prepare bot messages
prepareBotMessages();

// internationalization functions
var i18n = 
{
	// get user interface language
	getLanguage () {
		return language;
	} ,
	// set user interface language
	setLanguage (
		lang
	) {
		language = lang;
		prepareBotMessages();
	} ,
	// get translated text
	getText (
		toTranslate
	) {
		return botmessageTexts[toTranslate];
	}
};
// export the functions
module.exports = i18n;
