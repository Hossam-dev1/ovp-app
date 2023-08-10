import { GenreService } from '../../../../../core/services/Genre-Module/genre.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	addForm: FormGroup;
	isLoadingResults: boolean

	constructor(
		private fb: FormBuilder,
		private genreService: GenreService,
		private toastr: ToastrService,
		private cdr:ChangeDetectorRef

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
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			return
		}
		const formData = {
			key: this.getAddForm['key'].value,
			name: {
				en: this.getAddForm["name"].value["en"] || '',
				ar: this.getAddForm["name"].value["ar"] || ''
			}
		}
		this.genreService.add(formData).subscribe((resp) => {
			this.addForm.reset()
			this.toastr.success(resp.message + 'successfully');
		},
		(error)=>{
			const errorControll = Object.keys(error.error.errors).toString();
			this.getAddForm[errorControll].setErrors({'invalid':true})
			this.cdr.detectChanges();
			this.toastr.error(error.error.message);
		})
	}

}
