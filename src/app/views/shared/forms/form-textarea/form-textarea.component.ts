import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-textarea',
	templateUrl: './form-textarea.component.html',
	styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements OnInit {

	@Input() form: UntypedFormGroup;
	@Input() label: string;
	@Input() form_control_name:string = null;
	@Input() validation_type: string = null;

	constructor() {
	}

	ngOnInit() {
	}

}
