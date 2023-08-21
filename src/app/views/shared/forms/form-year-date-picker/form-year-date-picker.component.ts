import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, UntypedFormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const YEAR_MODE_FORMATS = {
	parse: {
		dateInput: 'YYYY',
	},
	display: {
		dateInput: 'YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'kt-form-year-date-picker',
	templateUrl: './form-year-date-picker.component.html',
	styleUrls: ['./form-year-date-picker.component.scss'],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'pt' },
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormYearDatePickerComponent),
			multi: true,
		},
	],
})
export class FormYearDatePickerComponent implements OnChanges {

	@Input() jpCustomFormFieldClass = '';
	@Input() form
	@Input() control_value
	@Input() form_control_name
	@Input() clearValue;
	@Input() patchValue;
	/** Component label */
	@Input() label = '';

	_max: Moment;
	@Input()
	get max(): number | Date {
		return this._max ? this._max.year() : undefined;
	}
	set max(max: number | Date) {
		if (max) {
			const momentDate =
				typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
			this._max = momentDate.isValid() ? momentDate : undefined;
		}
	}

	_min: Moment;
	@Input()
	get min(): number | Date {
		return this._min ? this._min.year() : undefined;
	}
	set min(min: number | Date) {
		if (min) {
			const momentDate =
				typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
			this._min = momentDate.isValid() ? momentDate : undefined;
		}
	}

	@Input() touchUi = false;

	@ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

	_inputCtrl: FormControl = new FormControl();

	// Function to call when the date changes.
	onChange = (year: Date) => { };

	// Function to call when the input is touched (when a star is clicked).
	onTouched = () => { };

	/** send the focus away from the input so  it doesn't open again */
	_takeFocusAway = (datepicker: MatDatepicker<Moment>) => { };

	constructor() { }
	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.clearValue?.currentValue) {
			this._inputCtrl.setValue('', { emitEvent: false });
		}
		console.log(changes);

		if (changes?.control_value?.currentValue) {
			console.log('control_value', this.control_value);
			let value = changes.control_value.currentValue
			this._inputCtrl.setValue(value, { emitEvent: false });
		}
	}
	ngAfterViewInit() {

		// this._takeFocusAway = this.parent._takeFocusAway;
	}

	writeValue(date: Date): void {
		if (date && this._isYearEnabled(date.getFullYear())) {
			const momentDate = moment(date);
			if (momentDate.isValid()) {
				momentDate.set({ date: 1 });
				this._inputCtrl.setValue(moment(date), { emitEvent: false });
			}
		}
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	// Allows Angular to disable the input.
	setDisabledState(isDisabled: boolean): void {
		isDisabled
			? (this._picker.disabled = true)
			: (this._picker.disabled = false);

		isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
	}

	_yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
		datepicker.close();

		if (!this._isYearEnabled(chosenDate.year())) {
			return;
		}

		chosenDate.set({ date: 1 });

		this._inputCtrl.setValue(chosenDate, { emitEvent: false });
		this.form.controls[this.form_control_name].setValue(chosenDate.year().toString())
		console.log(this.form.controls[this.form_control_name]);
		this.onChange(chosenDate.toDate());
		this.onTouched();
	}

	_openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
		if (!datepicker.opened) {
			datepicker.open();
		}
	}

	/** Whether the given year is enabled. */
	private _isYearEnabled(year: number) {
		// disable if the year is greater than maxDate lower than minDate
		if (
			year === undefined ||
			year === null ||
			(this._max && year > this._max.year()) ||
			(this._min && year < this._min.year())
		) {
			return false;
		}

		return true;
	}
}
