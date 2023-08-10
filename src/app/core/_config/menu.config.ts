import {ShortAccessMenuConfig} from './header-menues/short.access.menu.config';
import {AddNewMenuConfig} from './header-menues/add.new.menu.config';
import { GenreMenuConfig } from './aside-menues/genre.menu.config';



export class MenuConfig {

	// Aside Menu
	genreMenuConfig:GenreMenuConfig;

	// Header Menu
	shortAccessMenuConfig: ShortAccessMenuConfig;
	addNewMenuConfig:AddNewMenuConfig;

	constructor() {
		this.genreMenuConfig = new GenreMenuConfig();

		this.shortAccessMenuConfig = new ShortAccessMenuConfig();
		this.addNewMenuConfig = new AddNewMenuConfig();
	}

	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/cms/dashboard',
					translate: 'MENU.DASHBOARD',
				},

			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/cms/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
			]
		},
	};

	public get configs(): any {
		this.attachHeaderMenuItems();
		this.attachAsideMenuItems();
		return this.defaults;
	}

	public attachAsideMenuItems(){
		let template_items = this.genreMenuConfig.configs;
		this.attachAsideMenu(template_items);
	}

	public attachHeaderMenuItems() {
		// Short Access Config
		let short_access_items = this.shortAccessMenuConfig.configs;
		this.attachHeaderMenu(short_access_items);

		// Short Access Config
		let add_menu_items = this.addNewMenuConfig.configs;
		this.attachHeaderMenu(add_menu_items);
	}

	public attachAsideMenu(items){
		items.forEach((item)=>{
			this.defaults.aside.items.push(
				item
			);
		});
	}

	public attachHeaderMenu(items){
		items.forEach((item)=>{
			this.defaults.header.items.push(
				item
			);
		});
	}


}
