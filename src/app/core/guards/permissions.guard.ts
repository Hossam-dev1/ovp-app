import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountPermissionsService} from '../services/ACL-Module/account.permissions.service';

@Injectable({
	providedIn: 'root'
})
export class PermissionsGuard {

	route_permissions:Array<string>;
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
			return this.checkPermissions(stored_permissions, permissions);
		}
	}

	checkPermissions(stored_permissions, permissions){

		permissions.forEach((permission)=>{
			let check = stored_permissions.includes(permission);
			if (!check){
				this.router.navigate(['/cms/dashboard']);
				return false;
			}
		});

		return true;
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

	reactivate(stored_permissions){
		return this.checkPermissions(stored_permissions, this.route_permissions);
	}

}
