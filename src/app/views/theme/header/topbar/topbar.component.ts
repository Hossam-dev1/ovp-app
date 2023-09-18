// Angular
import {Component, OnInit} from '@angular/core';
import {LangService} from '../../../../core/services/lang.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
	lang = 'ar';

	constructor(private langService: LangService,
				private router: Router,
				private authService: AuthService) {
	}

	ngOnInit(): void {
		// check Lang in local storage
		if (localStorage.getItem('cms_lang')) {
			this.lang = localStorage.getItem('cms_lang');
		}
		// switch styles based on lang
	}

	switchLanguage() {
		localStorage.setItem('cms_lang', this.lang);
		this.router.navigateByUrl(this.router.url, {skipLocationChange: true}).then();
		this.langService.loadStyle();
	}

	Logout() {
		this.authService.logout().subscribe(resp => {

			localStorage.removeItem('token');
			localStorage.removeItem('token_expired');
			localStorage.removeItem('layoutConfig');
			localStorage.removeItem('permissions');
			localStorage.removeItem('country_id');
			localStorage.removeItem('name');

			this.router.navigate(['/login']);
		}, error => {
		});
	}

	generateName(){
		let name = localStorage.getItem('name') || 'User Name';
		if(name == 'undefined'){
			name = 'User Name'
		}
		let name_partition = name.split(' ');
		let generated_name = null;
		let name_partition_length = name_partition.length;
		if (name_partition_length){
			generated_name = (name_partition.length > 1) ? name_partition[0] + ' ' + name_partition[name_partition_length - 1] :  name_partition[0];
		}
		return generated_name;
	}

	generateNameAbbreviation(){
		let generated_name = this.generateName();
		let name_partition = generated_name.split(' ');
		let abbreviation = null;

		name_partition.forEach((partition) => {
			if (abbreviation){
				abbreviation = abbreviation + ' ' + partition.charAt(0) ;
			}
			else{
				abbreviation = partition.charAt(0);
			}
		});

		return abbreviation;

	}
}
