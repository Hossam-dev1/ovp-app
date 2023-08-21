import { LangService } from './../../../../../core/services/lang.service';
// Angular
import { ChangeDetectorRef, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'kt-material-preview',
	templateUrl: './material-preview.component.html',
	styleUrls: ['./material-preview.component.scss'],
})
export class MaterialPreviewComponent implements OnInit, OnChanges {
	// Public properties
	@Input() viewItem: any;
	@Input() title: string;
	@Input() headers: [];
	DataDetails:any
	lang:string = 'en'
	isLoadingResults:boolean = true
	/**
	 * Component constructor
	 */
	constructor(
		private _langService:LangService,
		private cdr:ChangeDetectorRef

	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.checkLocalLang();
		console.log(this.viewItem.content_images);


	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['viewItem'] && changes['viewItem'].firstChange ){
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}
	}
	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	check(param){
		console.log('param', param);

	}
	toLang(param, header?){
		if(header =="nationality" ){
			return this.lang == 'en' ? param['name']?.en : param['name']?.ar
		}else if(header == "types"){
			return param[0]['key'] +' | ' + this.lang == 'en' ? param[0]['name']?.en : param[0]['name']?.ar
		}
		return this.lang == 'en' ? param?.en : param?.ar
	}
	/**
	 * Toggle visibility
	 */
	changeCodeVisibility(): void {
		this.viewItem.isCodeVisible = !this.viewItem.isCodeVisible;
	}

	/**
	 * Check examples existing
	 */
	hasExampleSource(): boolean {
		if (!this.viewItem) {
			return false;
		}

		if (!this.viewItem.cssCode && !this.viewItem.htmlCode && !this.viewItem.scssCode && !this.viewItem.tsCode) {
			return false;
		}

		return true;
	}
}
