import {Injectable} from '@angular/core';
import {SystemPermissionsHelperService} from '../../services/Helpers/system.permissions.helper.service';
import {SectionIconsName} from '../../Global/section.icons.name';
import {RoutesName} from '../../Global/routes.name';


@Injectable({
	providedIn: 'root'
})
export class GenreMenuConfig {

	systemPermissionsHelperService: SystemPermissionsHelperService;

	constructor() {
		this.systemPermissionsHelperService = new SystemPermissionsHelperService();
	}

	private header = {section: 'Genre', translate: 'MENUS.GENRE.TITLE'};

	private section = {
		title: 'Genre',
		root: true,
		translate: 'MENUS.GENRE.TITLE',
		icon: 'flaticon2-open-box',
		submenu: [
			{
				"title": "Genre",
				"translate": "MENUS.GENRE.SUBMENU",
				"page": '/cms/genre'
			},
			{
				"title": "Company",
				"translate": "MENUS.GENRE.MENU.COMPANY.TITLE",
				"page": '/cms/company'
			},
			// {
			// 	"title": "Company Type",
			// 	"translate": "MENUS.GENRE.MENU.COMPANY_TYPE.TITLE",
			// 	"page": '/cms/company_type'
			// },
		]
	};

	public GENRE = {
	//	icon: SectionIconsName.TEMPLATE(),
		title: 'Genre',
		translate: 'MENUS.GENRE.MENU.GENRE',
		//page: RoutesName.TEMPLATE()
	};


	public menu: any = {
		items: [
		]
	};


	public checkRoutePermissions(){

		this.attachMenuItem([],this.GENRE);

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

	private attachMenu(){
		if (this.section.submenu.length){
			this.menu.items.push(this.header);
			this.menu.items.push(this.section);
		}
	}

	public get configs(): any {
		this.checkRoutePermissions();
		return this.menu.items;
	}

}
