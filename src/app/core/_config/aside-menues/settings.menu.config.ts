import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class SettingsMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Settings', translate: 'MENUS.TAGS.TITLE'};

	private section = {
		title: 'Settings',
		root: true,
		translate: 'MENUS.SETTINGS.TITLE',
		icon: 'flaticon2-gear',
		submenu: [
			{
				"title": "CMS Users",
				"translate": "MENUS.SETTINGS.MENU.USERS.TITLE",
				"page": '/cms/admins'
			},
			{
				"title": "Roles",
				"translate": "MENUS.SETTINGS.MENU.ROLES.TITLE",
				"page": '/cms/roles'
			},

			// {
			// 	"title": "Tags",
			// 	"translate": "MENUS.SETTINGS.MENU.TAGS.TITLE",
			// 	"page": '/cms/tags'
			// },
			// {
			// 	"title": "Content Provider",
			// 	"translate": "MENUS.SETTINGS.MENU.CONTENT_PROVIDER.TITLE",
			// 	"page": '/cms/content_provider'
			// },
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
