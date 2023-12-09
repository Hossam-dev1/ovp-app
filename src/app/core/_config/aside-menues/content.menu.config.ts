import { Injectable } from '@angular/core';
import { SystemPermissionsHelperService } from '../../services/Helpers/system.permissions.helper.service';
import { SectionIconsName } from '../../Global/section.icons.name';
import { RoutesName } from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class ContentMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = { section: 'Content', translate: 'MENUS.Content.TITLE' };

	private section = {
		title: 'Content',
		root: true,
		translate: 'MENUS.CONTENT.TITLE',
		icon: 'fas fa-play',
		submenu: [
			{
				"title": "Clips",
				"translate": "MENUS.CONTENT.MENU.CLIPS.TITLE",
				"page": '/cms/clips'
			},
			{
				"title": "Movies",
				"translate": "MENUS.CONTENT.MENU.MOVIES.TITLE",
				"page": '/cms/movies'
			},
			{
				"title": "Plays",
				"translate": "MENUS.CONTENT.MENU.PLAYS.TITLE",
				"page": '/cms/plays'
			},
			{
				"title": "Series",
				"translate": "MENUS.CONTENT.MENU.SERIES.TITLE",
				"page": '/cms/series'
			},
			{
				"title": "Shows",
				"translate": "MENUS.CONTENT.MENU.SHOWS.TITLE",
				"page": '/cms/shows'
			},
			{
				"title": "Categories",
				"translate": "MENUS.CONTENT.MENU.CATEGORIES.TITLE",
				"page": '/cms/categories'
			},
			{
				"title": "Collections",
				"translate": "MENUS.SETTINGS.MENU.COLLECTIONS.TITLE",
				"page": '/cms/collections'
			},
			{
				"title": "Content Tags",
				"translate": "MENUS.CONTENT.MENU.TAGS.TITLE",
				"page": '/cms/tags'
			},

		]
	};

	public menu: any = {
		items: [
		]
	};

	private attachMenu() {
		if (this.section.submenu.length) {
			// this.menu.items.push(this.header);
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

	public checkRoutePermissions() {
		// this.attachMenuItem([],this.GENRE);
		this.attachMenu();
	}

	attachMenuItem(permissions, url) {
		let check = this.systemPermissionsHelperService.checkPermissions(permissions);
		if (check) {
			this.attach(url)
		}
	}

	private attach(url) {
		// this.section.submenu.push(url)
	}

}
