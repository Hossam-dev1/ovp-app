import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
	selector: 'kt-form-textarea',
	templateUrl: './form-textarea.component.html',
	styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements OnInit {

	@Input() form: UntypedFormGroup;
	@Input() form_group: string;
	@Input() title: string;
	@Input() label: string;
	@Input() value: any;
	@Input() placeholder: string;
	@Input() tooltip: string;
	@Input() example_label: string;
	@Input() form_control_name: string = null;
	@Input() validation_type: string = null;
	@Input() readonly: boolean = false;
	@Input() disabled: boolean = false;
	@Input() optional: boolean = false;
	@Input() type: string = "text";
	lang;

	constructor() {
	}

	ngOnInit() {
	}

}
