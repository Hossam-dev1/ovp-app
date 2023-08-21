import { LangService } from './../../../../core/services/lang.service';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
@Component({
	selector: 'kt-simple-table',
	templateUrl: './simple-table.component.html',
	styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnChanges {
	@Input() tableHeaders: string[];
	@Input() tableData;
	lang: string = 'en'
	constructor(
		private cdr: ChangeDetectorRef,
		private _langService: LangService,

	) { }
	ngOnChanges(changes: SimpleChanges): void {
		// console.log(changes);
		if (changes.tableData.currentValue) {
			this.tableData = changes.tableData.currentValue
			this.cdr.markForCheck()
		}
	}
	check(param) {
		console.log('param=>', param);
	}

	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}

}
