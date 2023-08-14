import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {FormErrorService} from '../../../../../core/services/FormError.service';

@Component({
	selector: 'kt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Input() form: UntypedFormGroup;

	constructor() {
	}

	ngOnInit() {
	}

}
