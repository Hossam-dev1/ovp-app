import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'kt-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

	addForm: UntypedFormGroup;
	isLoadingResults: boolean

	constructor(
		private fb: UntypedFormBuilder,
		private _crewTypeService: CrewTypeService,
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
			key: new UntypedFormControl('', [Validators.required]),
			name: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
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
		this._crewTypeService.add(formData).subscribe((resp) => {
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


