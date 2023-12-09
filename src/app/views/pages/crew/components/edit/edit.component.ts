import { LangService } from './../../../../../core/services/lang.service';
import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
	btnLoading: boolean = false;


	// Data State
	crewTypesList: any[] = []
	nationalitiesList: any[] = []
	genderList: string[] = ['male', 'female']
	socialLink_list: string[] = []


	editForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	crew_ID: number;
	crewDetails: any
	lang: string = 'en'

	constructor(
		private fb: UntypedFormBuilder,
		private _location:Location,
		private _crewService: CrewService,
		private _langService: LangService,
		private _crewTypeService: CrewTypeService,
		private _nationalitiesService: NationalitiesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute

	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.getUrlID();
		this.initForm()
		this.getTypesList()
		this.getNationalitiesList();
	}
	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.markForCheck();
		})
	}
	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
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
			death_date: new UntypedFormControl(''),
			social_links: this.fb.group({
				facebook: new UntypedFormControl(''),
				instagram: new UntypedFormControl(''),
				twitter: new UntypedFormControl(''),
				youtube: new UntypedFormControl(''),
				tiktok: new UntypedFormControl(''),
				snapchat: new UntypedFormControl(''),
			}),
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
		})
	}

	getNationalitiesList() {
		this._nationalitiesService.list().subscribe((resp) => {
			this.nationalitiesList = resp.body;
			this.cdr.markForCheck()
		})
	}

	patchUserData() {
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
			types: this.crewDetails["types"].map((crew) => crew['id']),
			nationality_id: this.crewDetails["nationality"]['id'],
			thumb: this.crewDetails["thumb"],
			social_links: {
				facebook: this.crewDetails["social_links"]["facebook"],
				instagram: this.crewDetails["social_links"]["instagram"],
				twitter: this.crewDetails["social_links"]["twitter"],
				youtube: this.crewDetails["social_links"]["youtube"],
				tiktok: this.crewDetails["social_links"]["tiktok"],
				snapchat: this.crewDetails["social_links"]["snapchat"],
			},
		});
		this.socialLink_list = this.crewDetails["social_links"]
	}


	addCustomLink = (term) => (term);

	formattedDate(dateParam: string) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {

		this.btnLoading = true;
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		const formData = this.editForm.value;
		formData['birth_date'] = this.formattedDate(formData['birth_date'])
		if (formData['death_date']) {
			formData['death_date'] = this.formattedDate(formData['death_date'])
		} else {
			delete formData['death_date'];
		}
		console.log(this.editForm.value);
		this._crewService.edit(this.crew_ID, formData).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this.btnLoading = false;
			this._location.back();
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;

				this.cdr.detectChanges();
			})
	}

}
