import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-date-picker',
	templateUrl: './form-date-picker.component.html',
	styleUrls: ['./form-date-picker.component.scss']
})
export class FormDatePickerComponent implements OnInit {

	@Input() form: UntypedFormGroup;
	@Input() label: string;
	@Input() form_control_name: string = null;
	@Input() validation_type: string = null;
	@Input() type: string = 'text';

	constructor() {
	}

	ngOnInit() {
	}

}
