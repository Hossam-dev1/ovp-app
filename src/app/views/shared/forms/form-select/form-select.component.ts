import { LangService } from './../../../../core/services/lang.service';
import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'kt-form-select',
	templateUrl: './form-select.component.html',
	styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit, OnChanges {
	isloading:boolean = true;
	lang:string = 'en';

	@Input() form: FormGroup;
	@Input() label: string;
	@Input() form_control_name:string = null;
	@Input() validation_type: string = null;
	@Input() list:any [] = [];
	@Input() genderList:string[] = [];
	@Input() typesList:any[] = [];
	@Input() is_multi: boolean = false;

	dataList$:any[] =[]

	constructor(
		private cdr:ChangeDetectorRef,
		private _langService: LangService
		) {
	}

	ngOnInit() {
		this.checkLocalLang()
	}
	toLang(param){
		return this.lang == 'en' ? param.en : param.ar
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	ngOnChanges(changes: SimpleChanges): void {

		if (changes.typesList?.currentValue.length > 0){
			this.isloading = false
			this.cdr.detectChanges()
		}
		// console.log(changes);

	}

}
