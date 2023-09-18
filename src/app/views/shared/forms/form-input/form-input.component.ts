import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-input',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
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
