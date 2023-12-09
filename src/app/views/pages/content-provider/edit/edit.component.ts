import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'kt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	btnLoading: boolean = false;

	// Data State
	editForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	content_ID: number;
	contentDetails: any

	constructor(
		private fb: UntypedFormBuilder,
		private _location:Location,
		private _contentProviderService: ContentProviderService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute

	) { }

	ngOnInit() {
		this.getUrlID();
		this.initForm();
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.content_ID = Number(params.get('id'));
			this.getDetailsByID();
		});
	}

	getDetailsByID() {
		this._contentProviderService.show(this.content_ID).subscribe((resp: any) => {
			this.contentDetails = resp.body;
			this.isLoadingResults = false;
			this.patchUserData();
			this.cdr.markForCheck()
		})
	}
	protected get getEditForm() {
		return this.editForm.controls;
	}
	private initForm() {
		this.editForm = this.fb.group({
			name: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
			email: new FormControl('', [Validators.required, Validators.email]),
			image: new FormControl('', [Validators.required]),
			phone: new FormControl('', [
				Validators.required,
				Validators.minLength(11),
				Validators.maxLength(11),
				Validators.pattern('^[+]?[0-9]{11,11}$')
				]),
			address: new FormControl('', [Validators.required]),
		});
	}

	patchUserData() {
			this.editForm.patchValue({
				name: {
					en: this.contentDetails["name"]["en"],
					ar: this.contentDetails["name"]["ar"]
				},
				description: {
					en: this.contentDetails["name"]["en"],
					ar: this.contentDetails["name"]["ar"]
				},
				email: this.contentDetails["email"],
				image: this.contentDetails["image"],
				phone: this.contentDetails["phone"],
				address: this.contentDetails["address"],
			});
	}

	submit() {
		this.btnLoading = true;
		if (this.editForm.invalid) {			this.editForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		const formData = {
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getEditForm["description"].value["en"] || '',
				ar: this.getEditForm["description"].value["ar"] || ''
			},
			email: this.getEditForm['email'].value,
			image: this.getEditForm['image'].value,
			phone: this.getEditForm['phone'].value,
			address: this.getEditForm['address'].value,
		}
		this._contentProviderService.add(formData).subscribe((resp) => {
			this.editForm.reset()
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
