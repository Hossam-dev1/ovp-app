import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
	selector: 'kt-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

	provider_ID: number;
	providerDetails: any;
	isLoading: boolean = true;
	headersData = ['name', 'description', 'email', 'phone', 'address']
	constructor(
		private _contentProviderSerivce: ContentProviderService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,

	) { }

	ngOnInit() {
		this.provider_ID = Number(this._activatedRoute.snapshot.paramMap.get('id'))
		this.getProviderDetails()
	}

	getProviderDetails() {
		this._contentProviderSerivce.show(this.provider_ID).subscribe((resp: any) => {
			console.log(resp);
			this.providerDetails = resp.body;
			this.isLoading = false
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}
}
