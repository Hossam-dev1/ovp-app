import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';

@Injectable({
	providedIn: 'root'
})
export class SeriesMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Series', translate: 'MENUS.SERIES.TITLE'};

	private section = {
		title: 'Series',
		root: true,
		translate: 'MENUS.SERIES.TITLE',
		icon: 'fas fa-video',
		submenu: [
			{
				"title": "Series",
				"translate": "MENUS.SERIES.SUBMENU",
				"page": '/cms/series'
			},
			{
				"title": "Shows",
				"translate": "MENUS.SERIES.MENU.SHOWS.TITLE",
				"page": '/cms/shows'
			},
		]
	};

	public menu: any = {
		items: [
		]
	};

	private attachMenu(){
		if (this.section.submenu.length){
			// this.menu.items.push(this.header);
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

	public checkRoutePermissions(){
		// this.attachMenuItem([],this.GENRE);
		this.attachMenu();
	}

	attachMenuItem(permissions, url){
		let check = this.systemPermissionsHelperService.checkPermissions(permissions);
		if (check){
			this.attach(url)
		}
	}

	private attach(url){
		// this.section.submenu.push(url)
	}

}
