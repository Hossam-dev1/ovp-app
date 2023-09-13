import { CrewTypeService } from './../../../../core/services/Crew-Module/crew-type.service';
import { NationalitiesService } from './../../../../core/services/Crew-Module/nationalities.service';
import { CompanyService } from './../../../../core/services/Clips-Module/company.service';
import { GlobalConfig } from './../../../../core/Global/global.config';
import { PaginateParams } from './../../../../core/models/paginateParams.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DeleteModalComponent } from './../../../shared/delete-modal/delete-modal.component';
import { LangService } from './../../../../core/services/lang.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenreService } from './../../../../core/services/Genre-Module/genre.service';
import { TagService } from './../../../../core/services/Clips-Module/tags.service';

@Component({
	selector: 'kt-simple-grid-list',
	templateUrl: './simple-grid-list.component.html',
	styleUrls: ['./simple-grid-list.component.scss']
})
export class SimpleGridListComponent {

	// data State
	lang: string = 'en';

	constructor(
		private _langService: LangService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
		private translate: TranslateService,
		private _toaster: ToastrService,
		private _genereService:GenreService,
		private _companyTypeService:CompanyService,
		private _nationalitiesService:NationalitiesService,
		private _crewTypeService:CrewTypeService,
		private _tagsService:TagService


	) { }

	@Input() isLoading: boolean;
	@Input() title: boolean;
	@Input() dataList: [];
	@Input() dynamicServiceName: string;
	@Input() route_path: string;

	headerParams: PaginateParams = {
		active: 1,
		per_page: GlobalConfig.pagination_per_page,
		search_key: null,
		sort_key: null,
		sort_order: null,
		next_page_index: null
	};

	ngOnInit() {
		this.checkLocalLang()
	}
	check(param) {
		console.log(param);

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

	get dynamicService() {
		return this[this.dynamicServiceName];
	}
	deleteItem(id: number, elem) {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '40rem',
			data: {
				title: this.translate.instant('COMMON.Delete_Title', {
					name: elem.name[this.lang] || '',
				}),
				body: this.translate.instant('COMMON.Delete_Body', {
					name: elem.name[this.lang] || '',
					id: id
				}),
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.dynamicService.delete(id).subscribe(res => {
					this.dynamicService.isListChanged.next(true);
					this._toaster.success(res.message)
				}, handler => {
					this._toaster.error(handler.error?.error)
				});
			}
		});
	}
}
