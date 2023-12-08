import { SeasonsService } from '../../../../../core/services/Series-Module/seasons.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ToastrService } from 'ngx-toastr';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { LangService } from './../../../../../core/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	addForm: FormGroup;
	clearValue: boolean
	isLoading: boolean = false;


	series_ID: number;
	lang: string = 'en'


	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private _langService: LangService,
		private _companyService: CompanyService,
		private _seriesService: SeriesService,
		private _seasonsService: SeasonsService,
		private cdr: ChangeDetectorRef,
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
	crewTypeList: any[] = []
	seriesList: any[] = []
	ratingList: any[] = [
		{
			key: '+13',
			value: 13
		},
		{
			key: '+15',
			value: 15
		},
		{
			key: '+18',
			value: 18
		},
		{
			key: "All Ages",
			value: 0
		},
	]
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
			if (this.series_ID) {
				this.isSeriesIDExist = true
				this.cdr.markForCheck();
			}
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

			year: new FormControl('', [Validators.required]),
			no_of_episodes: new FormControl('', [Validators.required]),
			status: new FormControl(false, [Validators.required]), //boolen
			is_exclusive: new FormControl(false, [Validators.required]), //boolen
			is_new: new FormControl(false, [Validators.required]), //boolen
			is_asc: new FormControl(false, [Validators.required]), //boolen
			rate: new FormControl('', [Validators.required]), //boolen

			series_id: new FormControl(this.series_ID as number || ''),

			content_type_id: new FormControl('', [Validators.required]),
			// content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([]),

			companies: new FormControl([], [Validators.required]),

			tags: new FormControl([], [Validators.required]),
			categories: new FormControl([], [Validators.required]),
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
		this._seriesService.list().subscribe((resp) => {
			this.seriesList = resp.body;
			this.cdr.markForCheck()
		})
		this._providerService.list().subscribe((resp) => {
			this.providerList = resp.body;
			this.cdr.markForCheck()
		})
		this._companyService.list().subscribe((resp) => {
			this.companyList = resp.body;
			this.cdr.markForCheck()
		})
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == 'series_season') {
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
			series_genres: {
				content_type_id: this.contentTypeID
			},
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
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		console.log(this.addForm.value);

		// let formData = this.addForm.value;
		// formData['series_genres'] = [this.addForm.value['series_genres']]

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			return
		}
		this._seasonsService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.clearValue = true
			this.toastr.success(resp.message + ' successfully');
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



