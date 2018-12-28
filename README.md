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

A bot is a «smart agent» or an autonomous program (agent). A smart agent is able to interact with both humans and other smart agents.

RDF is one of Semantic Web standards and it's supported by the W3C. The RDF standard facilitates the treatment and the data exploration by autonomous agents. It makes data readable by both humans and machines.

The Javascript RDF library for browsers and Node.js is actively maintained by Tim Berner-Lee, the LinkedData team and other contributors.

## Dependencies

- rdflib.js 

## Install

Install all dependencies you may need to generate the js file.

```bash
$ npm install
```

## How to add more languages to the RDF multilingual bot

#### conf.js file
- Open the conf.js file and add your langage code as below :
```bash
exports.languages 	= ['en','fr', 'addYourLanguageCode'];
```

#### rdf/botmessages.rdf
- To add your new translated text, open the botmessages.rdf file from the rdf folder and complete the literals of the classe as below :
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
<rdfs:Class rdf:ID="welcome"> <!-- open a class (subclass of the main class) -->
	<rdfs:SubClassOf rdf:resource="#botmessages"/> <!-- the class parent of this class -->
	<rdfs:label rdf:value="welcome" /> <!-- the label of the class subject -->
	<!-- literals of the class in several languages -->
	<rdfs:literal xml:lang="en" rdfs:value="Hello World"/>
	<rdfs:literal xml:lang="fr" rdfs:value="Bonjour Monde"/> 
	<rdfs:literal xml:lang="addYourLanguageCode" rdfs:value="Bonjour Monde"/> 
</rdfs:Class> <!-- close the class -->
```

## LICENSE
MIT

