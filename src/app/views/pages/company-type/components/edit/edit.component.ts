import { CompanyTypeService } from './../../../../../core/services/Clips-Module/company-type.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'kt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	editForm: FormGroup;
	isLoadingResults: boolean
	genre_ID: number;
	companyType_object: any = {}

	constructor(
		private _fb: FormBuilder,
		private _companyTypeService: CompanyTypeService,
		private _toastr: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) { }

	protected get getEditForm() {
		return this.editForm.controls;
	}
	ngOnInit() {
		this.getUrlID()
		this.initForm()
	}
	private initForm() {
		this.editForm = this._fb.group({
			key: new FormControl('', [Validators.required]),
			name: this._fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
		});
	}

	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.genre_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this._companyTypeService.show(this.genre_ID).subscribe((resp: any) => {
			this.companyType_object = resp.body;
			this.patchUserData();
			console.log(this.companyType_object);
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this._toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}
	patchUserData() {
		console.log(this.companyType_object);
		this.editForm.patchValue({
			key: this.companyType_object['key'],
			name: {
				en: this.companyType_object["name"]["en"],
				ar: this.companyType_object["name"]["ar"]
			}
		});
	}

	submit() {
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return
		}
		const formData = {
			key: this.getEditForm['key'].value,
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			}
		}
		this._companyTypeService.edit(this.genre_ID, formData).subscribe((resp) => {
			this._toastr.success(resp.message + ' successfully');
		},
			(error) => {
				const errorControll = Object.keys(error.error.errors).toString();
				this.getEditForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
				this._toastr.error(error.error.message);
			})
	}

}



