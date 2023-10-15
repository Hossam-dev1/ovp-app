import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountPermissionsService } from '../services/ACL-Module/account.permissions.service';

@Injectable({
	providedIn: 'root'
})
export class PermissionsGuard implements CanActivateChild {

	route_permissions: Array<string>;
	constructor(private router: Router,
		private AccountPermissionsService: AccountPermissionsService) {

	}

	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {

		let permissions = route.data.permissions as Array<string>;

		this.route_permissions = permissions;
		let stored_permissions = JSON.parse(localStorage.getItem('permissions'));

		if (!stored_permissions) {
			return this.getPermission();
		}
		else {
			return this.checkPermissions(stored_permissions, this.route_permissions);
		}
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let childPermissions = childRoute.data.permissions as Array<string>;
		let stored_permissions = JSON.parse(localStorage.getItem('permissions'));

		let check = stored_permissions.some(permisson => childPermissions.includes(permisson))
		if (!check) {
			this.router.navigate(['/cms/dashboard']);
			return false;
		}
		return true
	}


	checkPermissions(stored_permissions, route_permissions: string[]) {
		// console.log('route_permissions', route_permissions);
		// console.log('stored_permissions', stored_permissions);
		let check = stored_permissions.some(permisson => route_permissions.includes(permisson))
		if (!check) {
			this.router.navigate(['/cms/dashboard']);
			return false;
		}
		return true
	}

	getPermission() {
		let check = false;
		this.AccountPermissionsService.list().subscribe(
			(resp) => {
				let permissions = this.AccountPermissionsService.preparePermissions(resp);
				localStorage.setItem('permissions', JSON.stringify(permissions));
				check = this.reactivate(permissions);
			},
			(handler) => {
			}
		);
		return check;
	}

	reactivate(stored_permissions) {
		return this.checkPermissions(stored_permissions, this.route_permissions);
	}

}
