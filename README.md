# Byteball-RDF-Multilingual-Bot

This is a simple Byteball multilingual bot implementation based on RDF standard.

- Valid RDF bot messages file with comments
- Basic human-bot interactions with comments
- Sentences in English and French with unicode emoji


## Why this multilingual RDF implementation

Current Byteball multilingual bots use i18n library. This library isn't safe due to :
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

- rdflib.js 

## Install

Install all dependencies you may need to generate the js file.

```bash
$ npm install
```

Install rdflib.js only

```bash
$ npm install rdflib
```
## How to add more languages to the RDF multilingual bot

#### conf.js file
- Open the conf.js file and add your langage code as below :
```bash
exports.languages 	= ['en','fr', 'addYourLanguageCode'];
```

#### rdf/botmessages.rdf
- To add your new translated text, open the botmessages.rdf file from the rdf folder and complete the literals of the class as below :
```bash
<rdfs:literal xml:lang="addYourNewLanguageCode" 
	rdfs:value="A new translation for the \"addYourNewLanguageCode\" language"/>
```

- To switch the interface language, provide to user a Byteball command inside the appropriate literal as below :
```bash
[» 🏳 My added language «](command:setLanguage#addYourLanguageCode)
```

- To add a new sentence to the bot message file, add a new RDF class and complete it as below (html comments are here only for clarity) :
```bash
<rdfs:Class rdf:ID="helloworld"> <!-- open a class (subclass of the main class) -->
	<rdfs:SubClassOf rdf:resource="#botmessages"/> <!-- the class parent of this class -->
	<rdfs:label rdf:value="helloworld" /> <!-- the label of the class subject -->
	<!-- literals of the class in several languages -->
	<rdfs:literal xml:lang="en" rdfs:value="Hello World"/>
	<rdfs:literal xml:lang="fr" rdfs:value="Bonjour Monde"/> 
	<rdfs:literal xml:lang="addYourLanguageCode" rdfs:value="Hello World in your new language"/> 
</rdfs:Class> <!-- close the class -->
```

- Add your new sentence into the multilingual bot
```bash
		// prepare message
		var preparedMessage = '';
		switch (cmd) {
			.	
			.
			.
			// add your new sentence here
			case 'helloworld':
				preparedMessage = i18n.getText(cmd)
			default:
				preparedMessage = i18n.getText('unknownCmd');
		}
```

## LICENSE
MIT

