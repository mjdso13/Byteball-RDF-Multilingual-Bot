
# Byteball-RDF-Multilingual-Bot

This is a simple Byteball multilingual bot implementation based on the RDF standard.

- [Valid RDF](https://www.w3.org/RDF/Validator/rdfval?URI=https%3A%2F%2Fraw.githubusercontent.com%2Fn-ric-v%2FByteball-RDF-Multilingual-Bot%2Fmaster%2Frdf%2Fbotmessages&PARSE=Parse+URI%3A+&TRIPLES_AND_GRAPH=PRINT_BOTH&FORMAT=PNG_EMBED) bot messages file.
-- Double quotation marks are valid but the W3C RDF validator doesn't interpret them correctly even if it considers the document valid.
- Basic human-bot interactions.
- Bot sentences in English and French with unicode emojis.

## What's new in version 1.0.1 ?

- Backup and reload the language interface preference of users.
-- Use the Byteball database module
- Purely descriptive RDF
-- Easier to read, to understand and to maintain
- Formatted parametric strings with the NodeJS module "util"
-- Array of arguments (%s, %d, %i, %f, %j, etc.) to use in a printf-like function.

## Why this multilingual RDF implementation

Current Byteball multilingual bots use i18n module. This module isn't safe due to :
- memory leaks
- files overwriting & creation
- various side effects
- many unicode characters unsupported
- unmaintained for the last 3 years

Use unsafe libraries could have severe consequences with a critical platform as Byteball.

## Why use the Resource Description Framework (RDF)

A bot is a «smart agent» or an autonomous program ([agent](https://en.wikipedia.org/wiki/Software_agent)). A smart agent is able to interact with both humans and other smart agents.

[RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) is one of [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web) standards and it's supported by the [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium). The [RDF standard](https://www.w3.org/RDF/) facilitates the treatment and the data exploration by autonomous agents. It makes data readable by both humans and machines.

The [Javascript RDF library](https://www.npmjs.com/package/rdflib) for browsers and Node.js is actively maintained by [Tim Berner-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee), the [LinkedData team](https://github.com/linkeddata/rdflib.js) and other contributors.

[RDF FAQ](https://www.w3.org/RDF/FAQ.html)

## Dependencies

- [rdflib.js](https://www.npmjs.com/package/rdflib)
- [util](https://www.npmjs.com/package/util)

## Install

Install all dependencies you may need to generate the js file should be installed automatically with this command.

```bash
$ npm install
```

But you can install them separately.

Install rdflib.js module

```bash
$ npm install rdflib
```

Install "util" module

```bash
$ npm install util
```

## How to add new languages to the RDF multilingual bot

#### [conf.js](https://github.com/n-ric-v/Byteball-RDF-Multilingual-Bot/blob/master/conf.js)
- Open the conf.js file and set your default langage code if it's not english as below :
```bash
exports.default_language = 'YourDefaultLanguageCode';
```
IETF BCP 47 language identifiers are recommended to be valid XML language attributes

#### [rdf/botmessages](https://github.com/n-ric-v/Byteball-RDF-Multilingual-Bot/blob/master/rdf/botmessages)
- To add a translation, open the 'botmessages' file from the rdf folder and add the appropriate labels as below :
```bash
<rdfs:label xml:lang="An_IETF_BCP47_Language_id">Your translation</rdfs:label>
```
There is only one limitation for now: All descriptions with label have to be translated if you want the bot works fine.

- To allow user to switch the interface language into a new language, you have to provide command inside a label. Currently, translation command are set under the "languages" description as below :
```bash
<rdf:Description rdf:ID="languages">
	<rdfs:label xml:lang="en">Choose your interface language:
[» 🇫🇷 Français «](command:setLanguage#fr)
[» 🏳 Your new language «](command:setLanguage#An_IETF_BCP47_Language_id)</rdfs:label>
<rdfs:label xml:lang="fr">Choisissez la langue de l'interface :
[» 🇬🇧 English «](command:setLanguage#en)
[» 🏳 Your new language «](command:setLanguage#An_IETF_BCP47_Language_id)</rdfs:label>
<rdfs:label xml:lang="An_IETF_BCP47_Language_id">Choose your interface language:
[» 🇬🇧 English «](command:setLanguage#en)
[» 🇫🇷 Français «](command:setLanguage#fr)</rdfs:label>
</rdf:Description>
```

## How to add new sentences to the RDF multilingual bot

#### [rdf/botmessages](https://github.com/n-ric-v/Byteball-RDF-Multilingual-Bot/blob/master/rdf/botmessages)
- To add a new phrase, open the 'botmessages' file and add the appropriate description with its labels as below :
```bash
<rdf:Description rdf:ID="A_New_Phrase">
<rdfs:label xml:lang="en">Your new phrase with 3 parametric strings : %s %d %f</rdfs:label>
<rdfs:label xml:lang="fr">Votre nouvelle phrase avec 3 paramètres: %s %d %f</rdfs:label>
<rdfs:label xml:lang="An_IETF_BCP47_Language_id">Your new phrase in another language with 3 parameters : %s %d %f</rdfs:label>
</rdf:Description>
```

- To add a new phrase with parameters, open the 'botmessages' file and add the appropriate description with its labels. In this example, we will set a string (%s), an integer (%i) and a float (%f) :
```bash
<rdf:Description rdf:ID="A_New_Phrase_With_Parameters">
<rdfs:label xml:lang="en">Your new phrase with 3 parametric strings : %s %d %f</rdfs:label>
<rdfs:label xml:lang="fr">Votre nouvelle phrase avec 3 paramètres: %s %d %f</rdfs:label>
<rdfs:label xml:lang="An_IETF_BCP47_Language_id">Your new phrase in another language with 3 parameters : %s %d %f</rdfs:label>
</rdf:Description>
```

#### [multilingualbot.js](https://github.com/n-ric-v/Byteball-RDF-Multilingual-Bot/blob/master/multilingualbot.js)
- Add your new phrase into the multilingualbot.js file
```bash
		// prepare message
		var preparedMessage = '';
		switch (cmd) {
			.	
			.
			.
			// add your new sentence here
			case 'A_New_Phrase':
				preparedMessage = i18nRDF.getText(cmd)
			default:
				...
		}
```

- To use parametric phrases, 
```bash
preparedMessage = i18nRDF.getFormatted( // format variable text
	i18nRDF.getText(A_New_Phrase_With_Parameters, from_address), // get translated command text
	["1", 2, 3.0] // set a parameters array (string, integer and float as in example above)
);
```

## LICENSE
MIT

