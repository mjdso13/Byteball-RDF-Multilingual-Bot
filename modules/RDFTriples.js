'use strict';
// RDF Triples extraction functions
var rdfTriples = 
{
	// return values of an RDF-Schema subject
	getSubjectValue (
		graph
	) {
		var arr = [];
		for (var i = 0; i < graph.length; i++) {
			var str = graph[i].subject.value;
			arr.push (
				str.substring (
					str.lastIndexOf("#") + 1
				)
			);
		}
		return arr;
	},
	// return values of an RDF-Schema object
	getObjectValue (
		graph , 
		lang
	) {
		var arr = [];
		for (var i = 0; i < graph.length; i++) {
			if (graph[i].object.language === lang) {
				arr.push(graph[i].object.value);
			}
		}
		return arr;
	}
};
// export the functions
module.exports = rdfTriples;
