import { ToastrService } from 'ngx-toastr';
import { HelperService } from './../../../../../core/services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthNoticeService } from './../../../../../core/services/auth-notice.service';
import { FormErrorService } from './../../../../../core/services/FormError.service';
import { RolesService } from './../../../../../core/services/ACL-Module/roles.service';
import { PermissionsService } from './../../../../../core/services/ACL-Module/permissions.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	// Data State
	role_ID: number;
	selectedMainOperation: string[] = [];
	Permission_Columns: any[] = []
	mainHeader_checkbox = ['List', 'Create', 'Get', 'Update', 'Delete']
	navigationSubscription;
	isValidationError: boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;
	imgURL: any = null;

	is_result: any = false;


	permissions: [];
	SelectedPermissions: any[] = [];

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
	initialiseComponent() {
		this.isLoadingResults = false;
		this.getPermissions();
	}

	/**
	 * Initiate the form
	 *
	 */
	private initForm() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			is_active: [true, Validators.required],
		});
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

	patchRoleData() {
		// this.form.patchValue({
		// 	name:
		// })
	}


	clearForm() {
		// this.form.reset();
		// this.initForm();
		// this.SelectedPermissions = []
	}

	private getPermissions() {

		this.permissionsService.list().subscribe(
			(resp) => {
				this.permissions = resp;
				this.is_result = true;
				this.isLoadingResults = false;
				this.initForm();
				this.filterPermissionsByOperation()
				this.cdr.markForCheck();

			}, error => {
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			});
	}

	filterPermissionsByOperation() {
		const convertedData = [];
		const uniqueTitles = {};

		this.permissions.forEach((item: any) => {
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
		console.log(convertedData);
	}


	submitForm() {
		if (this.selectedMainOperation.length < 1 || this.SelectedPermissions.length < 1) {
			this._toastrService.error('Select Permissions first')
			return
		}
		let selectedPermissions_IDs = []
		console.log('SelectedPermissions', this.SelectedPermissions);

		this.selectedMainOperation.forEach((operation: string, i) => {
			// console.log('operation=>', operation);

			this.SelectedPermissions.forEach((permission: any) => {
				if (permission.name.includes(operation)) {
					selectedPermissions_IDs.push(permission.id)
				}
			});
		});

		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		let rolesModel = {
			'name': controls['name'].value,
			'is_active': controls['is_active'].value,
			'permissions': selectedPermissions_IDs,
		}

		console.log(rolesModel);

		// call service to store Banner
		this.service.create(rolesModel).subscribe(resp => {
			this.clearForm();
			this._toastrService.success(resp.message || 'Added Successfuly')
			this.router.navigate(['../'], { relativeTo: this._activatedRoute }).then();
		}, handler => {
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
			// Add the checkbox value to the selectedMainOperation array
			checkboxValue.forEach(elem => {
				this.SelectedPermissions.push(elem);
			});

		} else {
			this.SelectedPermissions = this.SelectedPermissions.filter(item => !item.name.includes(checkboxTitle));
		}
		console.log('SelectedPermissions', this.SelectedPermissions);
	}


	handleMainHeaderChange(event: any, checkboxValue: string) {
		if (event.checked) {
			// Add the checkbox value to the selectedMainOperation array
			this.selectedMainOperation.push(checkboxValue);
		} else {
			// Remove the checkbox value from the selectedMainOperation array
			const index = this.selectedMainOperation.indexOf(checkboxValue);
			if (index >= 0) {
				this.selectedMainOperation.splice(index, 1);
			}
		}
		console.log(this.selectedMainOperation);
	}

}
