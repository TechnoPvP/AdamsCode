var Logger = function() {};

Logger.info = function(text) {
	console.log(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' [INFO] ::: ' + text);
};

Logger.debug = function(text) {
	console.log(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' [DEBUG] ::: ' + text);
};

Logger.error = function(text) {
	console.log(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' [ERROR] ::: ' + text);
};

module.exports = Logger;
