export const environment = {
	title:'ovp-cms',
	production: false,
	apisVersion: "v1" ,
	baseUrl: 'http://138.3.252.27/ovp_backend_2/public',
	debug: window["env"]["debug"] || false,

	url : function url (version: string = null) {
		return environment.baseUrl + '/api/' + ((version) ? version+'/' : '');
	}

};
