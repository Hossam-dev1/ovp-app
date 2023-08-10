// Angular
import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../../../../../core/services/auth.service';
import {Router} from '@angular/router';
// RxJS

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties

	user$ = null;
	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 */
	constructor(private authService: AuthService , private router: Router) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {

	}

	/**
	 * Log out
	 */
	Logout() {
		this.authService.logout().subscribe(resp => {
			localStorage.removeItem('token');
			localStorage.removeItem('token_expired');
			this.router.navigate(['/login']);
		} , error => {
		});

	}
}
