import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-select',
	templateUrl: './form-select.component.html',
	styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() label: string;
	@Input() form_control_name:string = null;
	@Input() validation_type: string = null;
	@Input() list:{name:string, id:any}[] = [];
	@Input() is_multi: boolean = false;

	constructor() {
	}

	ngOnInit() {
	}

}
