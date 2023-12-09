import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { CompanyTypeService } from './../../../../../core/services/Clips-Module/company-type.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	btnLoading: boolean = false;
	// Data State
	companyTypesList: any[] = []
	nationalitiesList: any[] = []

	addForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	clearValue: boolean

	constructor(
		private fb: UntypedFormBuilder,
		private _location:Location,
		private _companyService: CompanyService,
		private _companyTypeService: CompanyTypeService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.initForm()
		this.getTypesList()
	}

	protected get getAddForm() {
		return this.addForm.controls;
	}
	private initForm() {
		this.addForm = this.fb.group({
			// year: new FormControl('', [Validators.required]),
			// company_types: new FormControl([], [Validators.required]),
			logo: new FormControl('', [Validators.required]),
			country: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
		});
	}

	getTypesList() {
		this._companyTypeService.list().subscribe((resp) => {
			this.companyTypesList = resp.body;
			this.cdr.markForCheck()
			console.log(this.companyTypesList);

			// console.log(resp.body);
		})
	}

	submit() {
		this.btnLoading = true;
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		this._companyService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.clearValue = true
			this.toastr.success(resp.message + 'successfully');
			this.btnLoading = false;
			this.cdr.detectChanges();
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
