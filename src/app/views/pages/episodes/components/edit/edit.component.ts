import { EpisdosService } from './../../../../../core/services/Series-Module/episdos.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ToastrService } from 'ngx-toastr';
import { LangService } from './../../../../../core/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	btnLoading: boolean = false;
	selectedValues: number[] = [2, 4, 6];

	isLoading: boolean = false;

	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean
	episodes_ID: number;
	series_ID: number;
	seasons_ID: number;
	lang: string = 'en'

	constructor(
		private fb: FormBuilder,
		private _location: Location,
		private _langService: LangService,
		private _episdosService: EpisdosService,
		private _crewService: CrewService,
		private _crewTypesService: CrewTypeService,

		private cdr: ChangeDetectorRef,
		private toastr: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private _providerService: ContentProviderService,
		private _helperService: HelperService,
		private _tagsService: TagService
	) { }

	// Data State
	contentTypeList: any[] = []
	dimentionList: any[] = []
	providerList: any[] = []
	companyList: any[] = []
	crewList: any[] = []
	crewTypesList: any[] = []
	tagsList: any[] = []
	contentTypeID: number = null;

	episodes_object: any
	genres_IDs: number[] = []

	editForm: FormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;

	isListLoading: boolean = true
	isDimentionReady: boolean = false


	ngOnInit() {
		this.getUrlID()
		this.getNeededList()
		this.initForm()
		this.checkLocalLang()
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
	getUrlID() {
		this.isLoadingResults = true
		const queryParam = this._activatedRoute.snapshot.queryParams;
		this.series_ID = queryParam['series']
		this.seasons_ID = queryParam['seasons']

		this._activatedRoute.paramMap.subscribe((params: any) => {
			this.episodes_ID = params.get('id')
			this.getDataByID();
		});
	}
	getDataByID() {
		this._episdosService.show(this.episodes_ID).subscribe((resp: any) => {
			this.episodes_object = resp.body;
			console.log(this.episodes_object);

			this.patchEposidessData();
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchEposidessData() {
		this.editForm.patchValue({
			name: {
				en: this.episodes_object["name"]["en"],
				ar: this.episodes_object["name"]["ar"]
			},
			description: {
				en: this.episodes_object["name"]["en"],
				ar: this.episodes_object["name"]["ar"]
			},

			number: this.episodes_object['number'],
			duration: this.episodes_object['duration'],
			status: this.episodes_object['status'],
			publish_date: this.formattedDate(this.episodes_object['publish_date']),
			publish_end_date: this.formattedDate(this.episodes_object['publish_end_date']),
			series_id: this.episodes_object['series']['id'],
			season_id: this.episodes_object['season']['id'],

			// content_provider_id: this.episodes_object['content_provider']['id'],
			content_images: this.episodes_object['content_images'],



			// tags: [this.episodes_object['tags'][0]['id']],
		});
		if (this.episodes_object['crews'].length > 0) {
			this.patchFormArrayValues()
		}

	}

	protected get geteditForm() {
		return this.editForm?.controls;
	}

	private initForm() {
		this.editForm = this.fb.group({
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
			status: new FormControl('', [Validators.required]),
			series_id: new FormControl('', [Validators.required]),
			season_id: new FormControl('', [Validators.required]),

			// content_provider_id: new FormControl('', [Validators.required]),
			content_type_id: new FormControl('', [Validators.required]),
			content_images: this.fb.array([]),

			crews: this.fb.array([]),

			tags: new FormControl([], [Validators.required]),
			categories: new FormControl([], [Validators.required]),
		})
	}

	get getContentImgs() {
		return this.editForm.get('content_images') as FormArray
	}

	patchContentTypeID() {
		this.editForm.patchValue({
			content_type_id: this.contentTypeID
		})
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

	get getCrews() {
		return this.editForm.get('crews') as FormArray
	}

	crewForm(crewID?: number, crewTypeID?: number, index?: number) {
		return this.fb.group({
			crew_id: new FormControl(crewID || ''),
			crew_type_id: new FormControl(crewTypeID || ''),
			order: new FormControl(index || ''),
		})
	}

	patchFormArrayValues(): void {
		for (let i = 0; i < this.episodes_object['crews'].length; i++) {
			let crewRow = this.episodes_object['crews'][i]
			this.getCrews.push(this.crewForm(crewRow['id'], crewRow.crew_type['id'], i + 1))
			this.cdr.detectChanges()
		}
	}

	addCrewRow() {
		this.getCrews.push(this.crewForm())
	}
	removeCrewRow(i) {
		this.getCrews.removeAt(i)
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
		this._crewTypesService.list().subscribe((resp) => {
			this.crewTypesList = resp.body;
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
	formattedDate(dateParam:string) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}

	formatteDateWithTime(dateParam) {
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
		console.log('this.editForm.value', this.editForm.value);

		let formData = this.editForm.value;
		formData['publish_date'] = this.formatteDateWithTime(this.editForm.value['publish_date'])
		formData['publish_end_date'] ? formData['publish_end_date'] = this.formattedDate(this.editForm.value['publish_end_date']) : delete formData['publish_end_date'];

		this.btnLoading = true;
		if (this.editForm.invalid) {			this.editForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			// return
		}
		this._episdosService.edit(this.episodes_ID, this.editForm.value).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this._location.back();
			this.cdr.markForCheck();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.cdr.markForCheck();
			})
	}

}


