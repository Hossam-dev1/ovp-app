import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { CompanyTypeService } from './../../../../../core/services/Clips-Module/company-type.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	// Data State
	companyTypesList: any[] = []
	nationalitiesList: any[] = []

	editForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	company_ID: number;
	companyDetails: any

	constructor(
		private fb: UntypedFormBuilder,
		private _companyService: CompanyService,
		private _companyTypeService: CompanyTypeService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute

	) { }

	ngOnInit() {
		this.getUrlID();
		this.initForm()
		this.getTypesList()
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.company_ID = Number(params.get('id'));
			this.getDetailsByID();
		});
	}

	getDetailsByID() {
		this._companyService.show(this.company_ID).subscribe((resp: any) => {
			this.companyDetails = resp.body;
			this.isLoadingResults = false;
			this.cdr.markForCheck()
		})
	}
	protected get getEditForm() {
		return this.editForm.controls;
	}
	private initForm() {
		this.editForm = this.fb.group({
			year: new FormControl('', [Validators.required]),
			company_types: new FormControl([], [Validators.required]),
			logo: new FormControl('', [Validators.required]),
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
			this.patchUserData()
			this.cdr.markForCheck()
		})
	}

	patchUserData() {
		if (this.companyTypesList.length) {
			console.log(this.companyTypesList);

			this.editForm.patchValue({
				name: {
					en: this.companyDetails["name"]["en"],
					ar: this.companyDetails["name"]["ar"]
				},
				description: {
					en: this.companyDetails["name"]["en"],
					ar: this.companyDetails["name"]["ar"]
				},
				year: this.companyDetails["year"],
				logo: this.companyDetails["logo"],
				company_types: this.companyDetails["company_types"][0].id,
			});
		}
	}

	submit() {

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return
		}
		const formData = {
			year: this.getEditForm['year'].value,
			logo: this.getEditForm['logo'].value,
			company_types: [this.getEditForm['company_types'].value],
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getEditForm["description"].value["en"] || '',
				ar: this.getEditForm["description"].value["ar"] || ''
			}
		}
		this._companyService.edit(this.company_ID, formData).subscribe((resp) => {
			// this.editForm.reset()
			this.clearImgSrc = true
			this.toastr.success(resp.message + 'successfully');
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				const errorControll = Object.keys(error.error.errors).toString();
				this.getEditForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}