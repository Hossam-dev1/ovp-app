import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'kt-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
	TestForm: UntypedFormGroup;
	selected: any;
	toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
	indeterminate = 'after';

	constructor(private fb: UntypedFormBuilder) { }
  	ngOnInit() {
		this.initForm();
  	}
	/**
	 * Initiate the form
	 *
	 */
	private initForm() {
		this.TestForm = this.fb.group({
			text: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])] ,
			clear_text:  ['value Here', Validators.compose([
				Validators.required,
			])] ,
		});
	}
	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.TestForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	clearValue() {
		this.TestForm.controls['clear_text'].setValue('');
	}
}
