import { RolesService } from './../../../../../core/services/ACL-Module/roles.service';
import { AdminsService } from './../../../../../core/services/User-Module/admins.service';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit {
	editForm: FormGroup;
	isLoadingResults: boolean = true
	admin_ID: number;
	userData: any = {}
	rolesList: [] = []

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	constructor(
		private _fb: FormBuilder,
		private _toastr: ToastrService,
		private _adminsService: AdminsService,
		private _rolesService: RolesService,
		private _activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) { }

	protected get getEditForm() {
		return this.editForm.controls;
	}
	ngOnInit() {
		this.getRolesList();
		this.initForm()
	}
	ngAfterViewInit(): void {
		this.getUrlID()
	}
	private initForm() {
		this.editForm = this._fb.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			is_active: new FormControl('', [Validators.required]),
			roles: new FormControl([], [Validators.required]),
		});
	}

	getUrlID() {
		this._activatedRoute.paramMap.subscribe(params => {
			this.admin_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this._adminsService.get(this.admin_ID).subscribe((resp: any) => {
			this.userData = resp.body
			this.patchUserData();
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this._toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	getRolesList() {
		return this._rolesService.list(this.headerParams).subscribe((resp) => {
			this.rolesList = resp.body
		})
	}
	patchUserData() {
		const roleIDs: [] = this.userData['roles'].map((role) => role.id);
		this.editForm.patchValue({
			name: this.userData['name'],
			email: this.userData['email'],
			is_active: this.userData['is_active'],
			roles: roleIDs,
		});
		this.editForm.updateValueAndValidity()
		this.isLoadingResults = false;
		this.cdr.detectChanges();
	}

	submit() {
		console.log(this.editForm.value);

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return
		}

		this._adminsService.update(this.admin_ID, this.editForm.value).subscribe((resp: any) => {
			this._toastr.success(resp.message || 'Updated' + ' successfully');
		},
			(error) => {
				this.cdr.detectChanges();
				this._toastr.error(error.error.message);
			})
	}

}



