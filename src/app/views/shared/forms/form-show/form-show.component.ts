import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-show',
	templateUrl: './form-show.component.html',
	styleUrls: ['./form-show.component.scss']
})
export class FormShowComponent implements OnInit {

	@Input() label: string;
	@Input() value:any = null;
	@Input() default_value:any = null;

	constructor() {
	}

	ngOnInit() {
	}

}
