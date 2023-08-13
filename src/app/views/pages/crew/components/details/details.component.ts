import { ActivatedRoute } from '@angular/router';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
	selector: 'kt-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	crew_ID:number;
	crewDetails:any;
	isLoading:boolean = true;

	constructor(
		private _crewService: CrewService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute:ActivatedRoute,

	) { }

	ngOnInit() {
		this.crew_ID = Number(this._activatedRoute.snapshot.paramMap.get('id'))
		this.getCrewDetails()
	}

	getCrewDetails(){
		this._crewService.show(this.crew_ID).subscribe((resp:any)=>{
			console.log(resp);

			this.crewDetails = resp.body;
			this.isLoading = false
			this.cdr.markForCheck()
			// console.log(resp.body);
		})

}
}
