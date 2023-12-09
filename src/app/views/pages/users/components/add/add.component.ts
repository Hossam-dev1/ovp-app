import { RolesService } from './../../../../../core/services/ACL-Module/roles.service';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { AdminsService } from './../../../../../core/services/User-Module/admins.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	btnLoading: boolean = false;

	addForm: FormGroup;
	isLoadingResults: boolean
	rolesList: string[] = []
	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	constructor(
		private fb: FormBuilder,
		private _location: Location,
		private _adminsService: AdminsService,
		private _rolesService: RolesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.initForm()
		this.getRolesList()
	}

	getRolesList() {
		return this._rolesService.list(this.headerParams).subscribe((resp) => {
			this.rolesList = resp.body
		})
	}

	protected get getAddForm() {
		return this.addForm.controls;
	}
	private initForm() {
		this.addForm = this.fb.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			is_active: new FormControl(false, [Validators.required]),
			password: new FormControl('', [Validators.required]),
			roles: new FormControl('', [Validators.required]),
		});
	}

	submit() {
		this.btnLoading = true;
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		this._adminsService.create(this.addForm.value).subscribe((resp: any) => {
			this.addForm.reset()
			this.toastr.success(resp.message || 'Added' + ' successfully');
			this.btnLoading = false;
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;
				const errorControll = Object.keys(error.error.errors).toString();
				this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}
