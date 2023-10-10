import { ToastrService } from 'ngx-toastr';
import { HelperService } from './../../../../../core/services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthNoticeService } from './../../../../../core/services/auth-notice.service';
import { FormErrorService } from './../../../../../core/services/FormError.service';
import { RolesService } from './../../../../../core/services/ACL-Module/roles.service';
import { PermissionsService } from './../../../../../core/services/ACL-Module/permissions.service';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit {
	@ViewChild('header_checkbox') header_checkbox: MatCheckbox;
	// Data State
	editUserObj: any = {}

	selectedMainOperation: any = new Set();
	role_ID: number;
	Permission_Columns: any[] = []
	Operation_Checkboxs = [
		{ label: 'List', control: new FormControl(false) },
		{ label: 'Create', control: new FormControl(false) },
		{ label: 'Get', control: new FormControl(false) },
		{ label: 'Update', control: new FormControl(false) },
		{ label: 'Delete', control: new FormControl(false) },
	];
	navigationSubscription;
	isValidationError: boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;
	imgURL: any = null;

	is_result: any = false;


	permissions: [];
	SelectedPermissions: any = new Set();

	page_name: string;
	content_name: string;

	constructor(private fb: FormBuilder,
		private service: RolesService,
		private formErrorService: FormErrorService,
		private authNoticeService: AuthNoticeService,
		private _toastrService: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private router: Router,
		public permissionsService: PermissionsService,
		private cdr: ChangeDetectorRef,
		private translate: TranslateService,
		private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}


	ngOnInit() {
		this.initialiseComponent();
	}

	ngAfterViewInit() {
		// setTimeout(() => {
		// 	this.patchSelectedPermissions();
		// 	this.cdr.markForCheck();
		// }, 800);
	}

	initialiseComponent() {
		this.isLoadingResults = true;
		this.initForm();
		this.getPermissions();
		this.getUrlID();
	}

	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.role_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this.service.get(this.role_ID).subscribe((resp: any) => {
			this.editUserObj = resp.body
			// console.log('getDataByID', this.editUserObj);
			this.patchRoleData()
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this._toastrService.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchRoleData() {
		this.form.patchValue({
			name: this.editUserObj['name'],
			is_active: this.editUserObj['is_active']
		})
		this.patchCheckedOperations()
		this.patchSelectedPermissions()
		this.cdr.markForCheck()
	}
	/**
	 * Initiate the form
	 *
	 */
	private initForm() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			is_active: ['', Validators.required],
		});
	}
	isMatchPermissions(title: string) {
		return new FormControl(this.editUserObj?.permission?.some((per: any) =>
			per.name.includes(title)
		));
	}
	isMatchHeader(header: string): boolean {
		return this.editUserObj?.permission?.some((per: any) =>
			per.name.includes(header)
		);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to validators name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		return this.formErrorService.isControlHasError(this.form, controlName, validationType);
	}

	isLanguageHasError(index, controlName: string, validationType: string): boolean {
		return this.formErrorService.isLanguageHasError(this.form, index, controlName, validationType);
	}

	private getPermissions() {
		this.permissionsService.list().subscribe(
			(resp) => {
				this.permissions = resp;
				this.filterPermissionsByOperation()
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			}, error => {
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			});
	}

	filterPermissionsByOperation() {
		const convertedData = [];
		const uniqueTitles = {};
		this.permissions.forEach((item: any, i) => {
			let title = item.name.split(" ").slice(0, 2).join(' ');
			if (!uniqueTitles[title]) { // is not exist before
				uniqueTitles[title] = true;
				if (item.name.includes('Admins Role ')) {
					return
				}
				if (item.name.includes('Notifications')) {
					title = 'Admins Notifications'
				}
				if (item.name.includes('Admins Admins')) {
					title = 'Admins Control'
				}
				convertedData.push({
					title: title,
					selected: new FormControl(false),
					data: [item]
				});
			} else {
				convertedData.forEach(convertedItem => {
					if (convertedItem.title === title) {
						convertedItem.data.push(item);
					}
				});
			}
		});
		this.Permission_Columns = convertedData
		this.cdr.markForCheck();
		console.log('Permission_Columns', convertedData);
	}

	patchSelectedPermissions() {
		let editUserPermission: any = this.editUserObj?.permission
		editUserPermission?.forEach(permission => {
			const title = permission.name.split(" ").slice(0, 2).join(' ');
			this.Permission_Columns.forEach((item, i) => {
				if (item?.title == title) {
					item.selected.setValue(true)
					item.selected.updateValueAndValidity()
					item.data.forEach(item => {
						this.SelectedPermissions.add(item);
					});
				}
			});
		})
		this.is_result = true
		this.cdr.markForCheck()
	}

	patchCheckedOperations() {
		this.editUserObj?.permission?.forEach((permission, i) => {

			if (permission.name.includes('List')) {
				this.Operation_Checkboxs[0].control.setValue(true)
				this.selectedMainOperation.add('List')
			}
			if (permission.name.includes('Create')) {
				this.Operation_Checkboxs[1].control.setValue(true)
				this.selectedMainOperation.add('Create')
			}
			if (permission.name.includes('Get')) {
				this.Operation_Checkboxs[2].control.setValue(true)
				this.selectedMainOperation.add('Get')
			}
			if (permission.name.includes('Update')) {
				this.Operation_Checkboxs[3].control.setValue(true)
				this.selectedMainOperation.add('Update')
			}
			if (permission.name.includes('Delete')) {
				this.Operation_Checkboxs[4].control.setValue(true)
				this.selectedMainOperation.add('Delete')
			}
		});
		this.cdr.markForCheck();
	}



	submitForm() {
		const selectedOperations = Array.from(this.selectedMainOperation)
		const SelectedPermissions = Array.from(this.SelectedPermissions)

		if (selectedOperations.length < 1 || SelectedPermissions.length < 1) {
			this._toastrService.error('Select Permissions first')
			return
		}
		let selectedPermissions_IDs = new Set();

		selectedOperations.forEach((operation: string, i) => {
			console.log('operation=>', operation);

			SelectedPermissions.forEach((permission: any) => {
				if (permission.name.includes(operation)) {
					console.log('permissionTitle=>', permission.name);

					selectedPermissions_IDs.add(permission.id)
				}
			});
		});
		console.log(selectedPermissions_IDs);

		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		let rolesModel = {
			'name': controls['name'].value,
			'is_active': controls['is_active'].value,
			'permissions': Array.from(selectedPermissions_IDs)
		}

		console.log(rolesModel);

		// call service to store Banner
		this.service.update(this.role_ID, rolesModel).subscribe(resp => {
			// this.clearForm();
			this._toastrService.success(resp.message || 'Updated Successfuly')
			// this.router.navigate(['../'], { relativeTo: this.route }).then();
		}, handler => {
			this._toastrService.error(handler.errors.message || 'Updated Successfuly')
			this.isLoadingResults = false;
			this.isValidationError = true;
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.isLoadingResults = false;

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}

		if (this.isValidationError) {
			this.authNoticeService.setNotice(null);
		}
	}

	handleSelectedPermissions(event: any, checkboxValue: [], checkboxTitle: string) {
		if (event.checked) {
			// Add the checkbox value to the SelectedPermissions array
			checkboxValue.forEach(elem => {
				this.SelectedPermissions.add(elem);
			});
		} else {
			checkboxValue.forEach(elem => {
				this.SelectedPermissions.delete(elem);
			});
		}
	}


	handleMainHeaderChange(event: any, checkboxValue: string) {
		event.checked ? this.selectedMainOperation.add(checkboxValue) : this.selectedMainOperation.delete(checkboxValue)
	}
}
