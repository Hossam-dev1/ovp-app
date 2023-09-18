import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { CompanyTypeService } from './../../../../../core/services/Clips-Module/company-type.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	// Data State
	companyTypesList: any[] = []
	nationalitiesList: any[] = []

	addForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	clearValue:boolean

	constructor(
		private fb: UntypedFormBuilder,
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

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			return
		}
		// const formData = {
		// 	logo: this.getAddForm['logo'].value,
		// 	name: {
		// 		en: this.getAddForm["name"].value["en"] || '',
		// 		ar: this.getAddForm["name"].value["ar"] || ''
		// 	},
		// 	description: {
		// 		en: this.getAddForm["description"].value["en"] || '',
		// 		ar: this.getAddForm["description"].value["ar"] || ''
		// 	}
		// }
		this._companyService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.clearValue = true
			this.toastr.success(resp.message + 'successfully');
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				const errorControll = Object.keys(error.error.errors).toString();
				this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}
}
