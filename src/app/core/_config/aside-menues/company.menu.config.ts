import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class CompanyMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Company', translate: 'MENUS.COMPANY.TITLE'};

	private section = {
		title: 'Company',
		root: true,
		translate: 'MENUS.COMPANY.TITLE',
		//icon: SectionIconsName.TEMPLATE(),
		submenu: [
			{
				"title": "Company",
				"translate": "MENUS.COMPANY.SUBMENU",
				"page": '/cms/Company'
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
