import { Injectable } from '@angular/core';
import { SystemPermissionsHelperService } from '../../services/Helpers/system.permissions.helper.service';
import { SectionIconsName } from '../../Global/section.icons.name';
import { RoutesName } from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class AddNewMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;


	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private section = {
		title: 'Add New', // <= Title of the page
		root: true,
		translate: 'MENU.ADD_NEW',
		icon: 'flaticon-plus',
		submenu: [
			{
				"title": 'Genere',
				"translate": "MENUS.GENRE.SUBMENU",
				"page": '/cms/genre'

			},
			{
				"title": 'Crew',
				"translate": "MENUS.CREW.SUBMENU",
				"page": '/cms/crew'
			},
			{
				"title": 'Clips',
				"translate": "MENUS.CLIPS.SUBMENU",
				"page": '/cms/clips'
			},
			{
				"title": 'Company',
				"translate": "MENUS.GENRE.MENU.COMPANY.TITLE",
				"page": '/cms/company'
			},
			{
				"title": 'Nationalities',
				"translate": "MENUS.CREW.MENU.NATIIONALITIES.TITLE",
				"page": '/cms/nationalities'
			},
			{
				"title": 'Content Providers',
				"translate": "MENUS.SETTINGS.MENU.CONTENT_PROVIDER.TITLE",
				"page": '/cms/content_provider'
			},
			{
				"title": 'Series',
				"translate": "MENUS.SERIES.SUBMENU",
				"page": '/cms/series'
			},

		]
	};

	public TEMPLATE = {
		//	icon: SectionIconsName.TEMPLATE(),
		// title: 'MENUS.TEMPLATE.MENU.TEMPLATE',
		// translate: 'MENUS.TEMPLATE.MENU.TEMPLATE',
		//page: RoutesName.TEMPLATE()
	};

	public menu: any = {
		items: [
		]
	};

	public checkRoutePermissions() {

		this.attachMenuItem([], this.TEMPLATE);

		this.attachMenu();
	}

	attachMenuItem(permissions, url) {
		let check = this.systemPermissionsHelperService.checkPermissions(permissions);
		if (check) {
			this.attach(url)
		}
	}

	private attach(url) {
		this.section.submenu.push(url)
	}

	private attachMenu() {
		if (this.section.submenu.length) {
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

}
