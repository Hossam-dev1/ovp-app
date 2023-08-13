import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class CrewMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Crew', translate: 'MENUS.CREW.TITLE'};

	private section = {
		title: 'Crew',
		root: true,
		translate: 'MENUS.CREW.TITLE',
		//icon: SectionIconsName.TEMPLATE(),
		submenu: [
			{
				"title": "Crew",
				"translate": "MENUS.CREW.SUBMENU",
				"page": '/cms/crew'
			},
			{
				"title": "Crew Type",
				"translate": "MENUS.CREW.MENU.CREW_TYPE.TITLE",
				"page": '/cms/crew_type'
			},
			{
				"title": "Nationalities",
				"translate": "MENUS.CREW.MENU.NATIIONALITIES.TITLE",
				"page": '/cms/nationalities'
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
