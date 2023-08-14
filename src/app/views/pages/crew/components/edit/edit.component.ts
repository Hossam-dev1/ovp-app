import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


	// Data State
	crewTypesList: any[] = []
	nationalitiesList: any[] = []

	editForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	crew_ID: number;
	crewDetails: any

	constructor(
		private fb: UntypedFormBuilder,
		private _crewService: CrewService,
		private _crewTypeService: CrewTypeService,
		private _nationalitiesService: NationalitiesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute

	) { }

	ngOnInit() {
		this.getUrlID();
		this.initForm()
		this.getTypesList()
		this.getNationalitiesList();
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.crew_ID = Number(params.get('id'));
			this.getDetailsByID();
		});
	}

	getDetailsByID() {
		this._crewService.show(this.crew_ID).subscribe((resp: any) => {
			this.crewDetails = resp.body;
			this.isLoadingResults = false;
			this.cdr.markForCheck()
		})
	}
	protected get getEditForm() {
		return this.editForm.controls;
	}
	private initForm() {
		this.editForm = this.fb.group({
			gender: new UntypedFormControl('', [Validators.required]),
			birth_date: new UntypedFormControl('', [Validators.required]),
			death_date: new UntypedFormControl('', [Validators.required]),
			social_links: new UntypedFormControl([], [Validators.required]),
			types: new UntypedFormControl([], [Validators.required]),
			thumb: new UntypedFormControl('', [Validators.required]),
			nationality_id: new UntypedFormControl('', [Validators.required]),
			name: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
		});
	}

	getTypesList() {
		this._crewTypeService.list().subscribe((resp) => {
			this.crewTypesList = resp.body;
			this.patchUserData()

			this.cdr.markForCheck()

			// console.log(resp.body);
		})
	}

	getNationalitiesList() {
		this._nationalitiesService.list().subscribe((resp) => {
			this.nationalitiesList = resp.body;
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}

	patchUserData() {
		if (this.crewTypesList.length) {
			console.log(this.crewTypesList);

			this.editForm.patchValue({
				name: {
					en: this.crewDetails["name"]["en"],
					ar: this.crewDetails["name"]["ar"]
				},
				description: {
					en: this.crewDetails["name"]["en"],
					ar: this.crewDetails["name"]["ar"]
				},
				gender: this.crewDetails["gender"],
				birth_date: this.crewDetails["birth_date"],
				death_date: this.crewDetails["death_date"],
				types: this.crewDetails["types"][0].id,
				nationality_id: this.crewDetails["nationality"]['id'],
				thumb: this.crewDetails["thumb"],
				social_links: this.crewDetails["social_links"],
			});
		}
		console.log(this.crewDetails.nationality);

	}





	formattedDate(dateParam) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		console.log(this.getEditForm['thumb'].value);

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return
		}
		const formData = {
			gender: this.getEditForm['gender'].value,
			birth_date: this.formattedDate(this.getEditForm['birth_date'].value),
			death_date: this.formattedDate(this.getEditForm['death_date'].value),
			social_links: this.getEditForm['social_links'].value,
			types: [this.getEditForm['types'].value],
			thumb: this.getEditForm['thumb'].value,
			nationality_id: this.getEditForm['nationality_id'].value,
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getEditForm["description"].value["en"] || '',
				ar: this.getEditForm["description"].value["ar"] || ''
			}
		}
		this._crewService.add(formData).subscribe((resp) => {
			this.editForm.reset()
			this.clearImgSrc = true
			this.toastr.success(resp.message + 'successfully');
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				const errorControll = Object.keys(error.error.errors).toString();
				this.getEditForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}
