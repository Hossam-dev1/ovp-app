import { EpisdosService } from './../../../../../core/services/Series-Module/episdos.service';
import { SeasonsService } from '../../../../../core/services/Series-Module/seasons.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ToastrService } from 'ngx-toastr';
import { LangService } from './../../../../../core/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	btnLoading: boolean = false;
	addForm: FormGroup;
	clearValue: boolean
	isLoading: boolean = false;


	series_ID: number;
	seasons_ID: number;
	lang: string = 'en'

	constructor(
		private fb: FormBuilder,
		private _location: Location,
		private route: ActivatedRoute,
		private _langService: LangService,
		private _crewService: CrewService,
		private _crewTypeService: CrewTypeService,
		private cdr: ChangeDetectorRef,
		private _episodesService: EpisdosService,
		private toastr: ToastrService,
		private _providerService: ContentProviderService,
		private _helperService: HelperService,
		private _tagsService: TagService
	) { }

	// Data State
	contentTypeList: any[] = []
	dimentionList: any[] = []
	providerList: any[] = []
	companyList: any[] = []
	genreList: any[] = []
	crewList: any[] = []
	tagsList: any[] = []
	categoriesList: any[] = []
	crewTypeList: any[] = []
	seriesList: any[] = []

	contentTypeID: number = null;

	isLoadingResults: boolean;
	clearImgSrc: boolean;
	isSeriesIDExist: boolean;
	isListLoading: boolean = true
	isDimentionReady: boolean = false

	ngOnInit(): void {
		this.getNeededList()
		this.route.queryParams.subscribe((params) => {
			this.series_ID = params.series
			this.seasons_ID = params.seasons
		});
		this.initForm();
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
	convertLable(param: string, index: number) {
		const requriedLabel = index == 0 ? ' *' : ''
		return param.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + requriedLabel;
	}
	get getContentImgs() {
		return this.addForm.get('content_images') as FormArray
	}
	get getCrews() {
		return this.addForm.get('crews') as FormArray
	}

	private initForm() {
		this.addForm = this.fb.group({
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),

			number: new FormControl('', [Validators.required]),
			duration: new FormControl('', [Validators.required]),
			publish_date: new FormControl('', [Validators.required]),
			publish_end_date: new FormControl(''),
			status: new FormControl(false, [Validators.required]), //boolen

			series_id: new FormControl(this.series_ID as number || ''),
			season_id: new FormControl(this.seasons_ID as number || ''),

			content_type_id: new FormControl('', [Validators.required]),
			// content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([]),
			crews: this.fb.array([this.crewForm()]),


			tags: new FormControl([], [Validators.required]),
			categories: new FormControl([], [Validators.required]),
		})
	}

	addCrewRow() {
		this.getCrews.push(this.crewForm())
	}
	removeCrewRow(i) {
		this.getCrews.removeAt(i)
	}
	crewForm() {
		return this.fb.group({
			crew_id: new FormControl(''),
			order: new FormControl(1), // static value
			crew_type_id: new FormControl(''), // static value
		})
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl(''),
			dimention_id: new FormControl(''),
		})
	}
	setContentImgsValidation() {
		// Make the first content img control required
		if (this.getContentImgs.length > 0) {
			this.getContentImgs.controls[0]['controls']['img'].setValidators(Validators.required);
			this.getContentImgs.controls[0]['controls']['img'].updateValueAndValidity();
		}
	}

	getNeededList() {
		this._providerService.list().subscribe((resp) => {
			this.providerList = resp.body;
			this.cdr.markForCheck()
		})
		this._crewService.list().subscribe((resp) => {
			this.crewList = resp.body;
			this.cdr.markForCheck()
		})
		this._crewTypeService.list().subscribe((resp) => {
			this.crewTypeList = resp.body;
			this.cdr.markForCheck()
		})
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == 'series_episode') {
					this.contentTypeID = item.id
				}
			});
			this.patchContentTypeID()
			this.getDimentionList();
			this.cdr.markForCheck()
		})
		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
	}

	getDimentionList() {
		this._helperService.dimentionsList().subscribe((resp) => {
			this.dimentionList = resp.body;
			this.dimentionList = this.dimentionList.filter(item =>
				item['content_type']['id'] == this.contentTypeID
			)
			this.patchContentImgs()
			this.cdr.markForCheck()
		})
	}

	patchContentTypeID() {
		const value = {
			content_type_id: this.contentTypeID,
		}
		this.addForm.patchValue(value)
	}

	patchContentImgs() {
		if (this.dimentionList.length > 0) {
			for (let i = 0; i < this.dimentionList.length; i++) {
				this.getContentImgs.push(this.contentImgsForm())
				this.cdr.markForCheck()
			}
			this.setContentImgsValidation()
			this.isDimentionReady = true
		}
	}


	formattedDate(dateParam: string) {
		if (!dateParam) {
			return
		}
		const date = new Date(dateParam);
		const time = new Date()
		const formattedTime = time.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		return date.toISOString().slice(0, 10) + ' ' + formattedTime;
	}
	submit() {

		let formData = this.addForm.value;
		formData['content_images'] = this.getContentImgs.value.filter((item: any) => item.img)
		formData['publish_date'] = this.formattedDate(this.addForm.value['publish_date'])
		// check if user added publish_end_date or not
		formData['publish_end_date'] ? formData['publish_end_date'] = this.formattedDate(this.addForm.value['publish_end_date']) : delete formData['publish_end_date'];

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			return
		}
		this._episodesService.add(formData).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.clearValue = true
			this.toastr.success(resp.message + ' successfully');
			this._location.back();
			this.cdr.markForCheck();
		},
			(error) => {
				this.toastr.error(error.error.message);
				// const errorControll = Object.keys(error.error.errors).toString();
				// this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.markForCheck();
			})
	}

}



