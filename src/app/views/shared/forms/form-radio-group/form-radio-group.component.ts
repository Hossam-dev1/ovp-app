import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-radio-group',
	templateUrl: './form-radio-group.component.html',
	styleUrls: ['./form-radio-group.component.scss']
})
export class FormRadioGroupComponent implements OnInit {

	@Input() form: UntypedFormGroup;
	@Input() label: string;
	@Input() form_control_name:string = null;
	@Input() validation_type: string = null;
	@Input() first_choice: string;
	@Input() second_choice: string;
	@Input() default: boolean = true;

	constructor() {
	}

	ngOnInit() {
	}

}
