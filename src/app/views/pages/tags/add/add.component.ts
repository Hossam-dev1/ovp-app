import { TagService } from './../../../../core/services/Clips-Module/tags.service';
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

	constructor(
		private fb: FormBuilder,
		private _location: Location,
		private _tagsService: TagService,
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
			key: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
		});
	}

	submit() {
		this.btnLoading = true;
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}

		this._tagsService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.toastr.success(resp.message + ' successfully');
		},
			(error) => {
				this.toastr.error(error.error.message);
				const errorControll = Object.keys(error.error.errors).toString();
				this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}
