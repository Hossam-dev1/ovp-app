import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-upload-image',
	templateUrl: './form-upload-image.component.html',
	styleUrls: ['./form-upload-image.component.scss']
})
export class FormUploadImageComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() label: string;
	@Input() form_control_name: string = null;
	@Input() validation_type: string = null;
	@Input() to_base64:boolean = false;
	@Input() imgURL:any = null;

	constructor(private cdr: ChangeDetectorRef,) {
	}

	ngOnInit() {
	}

	onFileSelect(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			if (!this.to_base64){
				this.form.controls[this.form_control_name].setValue(file);
			}

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (_event) => {
				this.imgURL = reader.result;
				if (this.to_base64){
					this.form.controls[this.form_control_name].setValue(this.imgURL);
				}
				this.cdr.markForCheck();
			};

		}
	}
}
