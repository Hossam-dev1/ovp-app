import { CrewMenuConfig } from './aside-menues/crew.menu.config';
import { NationalitiesModule } from './../../views/pages/nationalities/nationalities.module';
import { ShortAccessMenuConfig } from './header-menues/short.access.menu.config';
import { AddNewMenuConfig } from './header-menues/add.new.menu.config';
import { GenreMenuConfig } from './aside-menues/genre.menu.config';
import { ClipMenuConfig } from './aside-menues/clibs.menu.config';



export class MenuConfig {

	// Aside Menu
	genreMenuConfig: GenreMenuConfig;
	crewMenuConfig: CrewMenuConfig;
	clipMenuConfig: ClipMenuConfig;

	// Header Menu
	shortAccessMenuConfig: ShortAccessMenuConfig;
	addNewMenuConfig: AddNewMenuConfig;

	constructor() {
		this.genreMenuConfig = new GenreMenuConfig();
		this.crewMenuConfig = new CrewMenuConfig();
		this.clipMenuConfig = new ClipMenuConfig();



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

	public attachAsideMenuItems() {
		// Genre Config
		let genre_items = this.genreMenuConfig.configs;
		this.attachAsideMenu(genre_items);

		// Crew Config
		let crew_items = this.crewMenuConfig.configs;
		this.attachAsideMenu(crew_items);

		// Crew Config
		let clip_items = this.clipMenuConfig.configs;
		console.log(clip_items);
		this.attachAsideMenu(clip_items);
	}

	public attachHeaderMenuItems() {
		// Short Access Config
		let short_access_items = this.shortAccessMenuConfig.configs;
		this.attachHeaderMenu(short_access_items);

		// Short Access Config
		let add_menu_items = this.addNewMenuConfig.configs;
		this.attachHeaderMenu(add_menu_items);
	}

	public attachAsideMenu(items) {
		items.forEach((item) => {
			this.defaults.aside.items.push(
				item
			);
		});
	}

	public attachHeaderMenu(items) {
		items.forEach((item) => {
			this.defaults.header.items.push(
				item
			);
		});
	}


}
