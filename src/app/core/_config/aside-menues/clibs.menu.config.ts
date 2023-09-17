import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class ClipMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Clips', translate: 'MENUS.CLIPS.TITLE'};

	private section = {
		title: 'Clips',
		root: true,
		translate: 'MENUS.CLIPS.TITLE',
		icon: 'fas fa-play',
		submenu: [
			{
				"title": "Clips",
				"translate": "MENUS.CLIPS.SUBMENU",
				"page": '/cms/clips'
			},
			{
				"title": "Movies",
				"translate": "MENUS.CLIPS.MENU.MOVIES.TITLE",
				"page": '/cms/movies'
			},
			{
				"title": "Plays",
				"translate": "MENUS.CLIPS.MENU.PLAYS.TITLE",
				"page": '/cms/plays'
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
