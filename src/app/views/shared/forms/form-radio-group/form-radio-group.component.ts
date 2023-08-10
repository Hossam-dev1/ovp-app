import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-radio-group',
	templateUrl: './form-radio-group.component.html',
	styleUrls: ['./form-radio-group.component.scss']
})
export class FormRadioGroupComponent implements OnInit {

	@Input() form: FormGroup;
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
