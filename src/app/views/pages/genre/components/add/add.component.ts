import { GenreService } from '../../../../../core/services/Genre-Module/genre.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	btnLoading: boolean = false;
	addForm: UntypedFormGroup;
	isLoadingResults: boolean

	constructor(
		private fb: UntypedFormBuilder,
		private _location:Location,
		private genreService: GenreService,
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
			// key: new UntypedFormControl('', [Validators.required]),
			name: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
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

		this.genreService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.toastr.success(resp.message + 'successfully');
			this.btnLoading = false;
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;
				this.cdr.detectChanges();
			})
	}

}
