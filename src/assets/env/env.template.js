(function(window) {
	window.env = window.env || {};

	// Environment variables
	window["env"]["stageUrl"] = "${API_STAGE_URL}";

	window["env"]["productionUrl"] = "${API_PROD_URL}";

	window["env"]["debug"] = "${DEBUG}";

})(this);
