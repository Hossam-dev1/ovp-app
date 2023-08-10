import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class FormErrorService {
	constructor() {
	}

	public markAsTouched(controls) {
		Object.keys(controls).forEach(controlName => {
				controls[controlName].markAsTouched();
				// loop to show languages errors
				if (controlName == 'languages'|| controlName == 'days' || controlName == 'locations') {
					// @ts-ignore
					let objects = controls[controlName].controls;
					Object.keys(objects).forEach(object_index => {
						let controls = objects[object_index].controls;
						Object.keys(controls).forEach(controlName => {
							controls[controlName].markAsTouched();
						});
					});
				}

			}
		);
		return;
	}

	public isControlHasError(form, controlName, validationType) {
		const control = form.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}

	public isLanguageHasError(form, index, controlName: string, validationType: string): boolean {
		let control = form.controls['languages'];
		// @ts-ignore
		control = control.controls[index].controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
