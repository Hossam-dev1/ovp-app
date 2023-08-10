(function(window) {
	window["env"] = window["env"] || {};

	// Environment variables
	window["env"]["stageUrl"] = localStorage.getItem('base_url');

	window["env"]["productionUrl"] = localStorage.getItem('base_url');

	window["env"]["debug"] = true;
})(this);
