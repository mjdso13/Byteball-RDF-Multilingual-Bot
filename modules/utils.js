'use strict';
var utils = 
{
	// parse user request and return command
	isParametricRequest (
		request
	) {
			return request.includes('#'); 
	}, 	// parse user request and return command
	getCmd (
		request
	) {
			return request.substring(0, request.indexOf('#')); 
	}, 
	// parse user request and return parameter
	getParameter (
		request
	) {
			return request.substring(request.lastIndexOf("#") + 1); 
	}
};
// export the functions
module.exports = utils;
