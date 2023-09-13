import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	isLoadingResults: boolean = true;
	contentProviderData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'email', 'image', 'options'];

	constructor(
		private _contentProviderSerivce: ContentProviderService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData()
		this._contentProviderSerivce.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}

	getListData() {
		this._contentProviderSerivce.list().subscribe((resp) => {
			this.contentProviderData = resp.body
			console.log(this.contentProviderData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
