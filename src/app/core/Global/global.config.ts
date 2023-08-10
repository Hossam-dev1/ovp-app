
export class GlobalConfig {


	public static list_per_page: number = 50;
	public static pagination_per_page: number = (parseInt( localStorage.getItem('pagination_per_page') )) ? parseInt( localStorage.getItem('pagination_per_page') ) : 10;

	public static setLocalStorageWithExpiry(key, value, ttl) {
		const now = new Date();

		const item = {
			value: value,
			expiry: now.getTime() + ttl,
		};

		localStorage.setItem(key, JSON.stringify(item))
	}

	public static getLocalStorageWithExpiry(key) {
		const itemStr = localStorage.getItem(key);
		// if the item doesn't exist, return null
		if (itemStr == null) {
			return null
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		// compare the expiry time of the item with the current time
		if (now.getTime() > item.expiry) {
			// If the item is expired, delete the item from storage
			// and return null
			localStorage.removeItem(key);
			return null
		}
		return item.value;
	}
}
