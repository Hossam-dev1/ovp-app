import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, UntypedFormGroup } from '@angular/forms';

@Component({
	selector: 'kt-form-upload-image',
	templateUrl: './form-upload-image.component.html',
	styleUrls: ['./form-upload-image.component.scss']
})
export class FormUploadImageComponent implements OnInit, OnChanges {

	@Input() form: UntypedFormGroup;
	@Input() formGroup: any;
	@Input() label: string;
	@Input() form_control_name: string = null;
	@Input() validation_type: string = null;
	@Input() to_base64: boolean = false;
	@Input() imgURL: any = null;
	@Input() clear_src: boolean;
	@Input() dimentionID: any;
	@Input() control_index: any
	@Input() addClass: any


	constructor(private cdr: ChangeDetectorRef,) {
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		// console.log(changes);

		if (changes?.clear_src?.currentValue) {
			this.imgURL = null
			this.cdr.markForCheck();
		}

	}

	onFileSelect(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			if (!this.to_base64) {
				this.form.controls[this.form_control_name].setValue(file);
			}

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (_event) => {
				this.imgURL = reader.result;
				this.cdr.markForCheck()
				if (this.to_base64) {
					if (this.formGroup) {

						const formGroup = this.form.controls[this.formGroup] as FormArray; // step 1
						const control = formGroup.at(this.control_index); // step 2
						control.patchValue({ img: this.imgURL, dimention_id: this.dimentionID }); // step 3
						// console.log(this.form.controls[this.formGroup]);

						return
					}
					return this.form.controls[this.form_control_name].setValue(this.imgURL);
				}
				this.cdr.markForCheck();
			};

		}
	}
}
