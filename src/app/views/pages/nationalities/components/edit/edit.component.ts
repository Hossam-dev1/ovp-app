import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	editForm: UntypedFormGroup;
	isLoadingResults: boolean
	genre_ID: number;
	genre_object: any = {}

	constructor(
		private _fb: UntypedFormBuilder,
		private _nationalitiesService: NationalitiesService,
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
			name: this._fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
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
		this._nationalitiesService.show(this.genre_ID).subscribe((resp: any) => {
			this.genre_object = resp.body;
			this.patchUserData();
			console.log(this.genre_object);
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this._toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}
	patchUserData() {
		console.log(this.genre_object);
		this.editForm.patchValue({
			name: {
				en: this.genre_object["name"]["en"],
				ar: this.genre_object["name"]["ar"]
			}
		});
	}

	submit() {
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return
		}
		const formData = {
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			}
		}
		this._nationalitiesService.edit(this.genre_ID, formData).subscribe((resp) => {
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
