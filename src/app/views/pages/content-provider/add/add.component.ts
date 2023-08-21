import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'kt-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

	addForm: UntypedFormGroup;
	isLoadingResults: boolean
	clearImgSrc:boolean;

	constructor(
		private fb: UntypedFormBuilder,
		private _contentProviderService: ContentProviderService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.initForm()
	}

	protected get getAddForm() {
		return this.addForm.controls;
	}
	private initForm() {
		this.addForm = this.fb.group({
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

	submit() {
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			return
		}
		const formData = {
			name: {
				en: this.getAddForm["name"].value["en"] || '',
				ar: this.getAddForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getAddForm["description"].value["en"] || '',
				ar: this.getAddForm["description"].value["ar"] || ''
			},
			email: this.getAddForm['email'].value,
			image: this.getAddForm['image'].value,
			phone: this.getAddForm['phone'].value,
			address: this.getAddForm['address'].value,
		}
		this._contentProviderService.add(formData).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
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
