import { TagService } from './../../../../core/services/Clips-Module/tags.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	tagsData: Observable<any[]>;
	displayedColumns: string[] = ['nameEn', 'nameAr', 'options'];


	constructor(
		private _tagsService: TagService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData()
		this._tagsService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}

	getListData() {
		this._tagsService.list().subscribe((resp) => {
			this.tagsData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
