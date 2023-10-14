import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from './../../../../../core/services/lang.service';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from './../../../../../core/services/Genre-Module/genre.service';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements AfterViewInit{
	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean

	lang: string = 'en'
	constructor(
		private fb: FormBuilder,
		private _langService: LangService,
		private _seriesService: SeriesService,
		private _genresService: GenreService,
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
	contentTypeID: number = null;

	addForm: FormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;

	isListLoading: boolean = true
	isDimentionReady: boolean = false


	ngOnInit() {
		this.initForm()
		this.checkLocalLang()
	}
	ngAfterViewInit(): void {
		this.getNeededList()
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
	protected get getAddForm() {
		return this.addForm.controls;
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
			series_start_year: new FormControl('', [Validators.required]),
			series_no_of_seasons: new FormControl('', [Validators.required]),
			series_status: new FormControl(0, [Validators.required]), //boolen
			is_exclusive: new FormControl(0, [Validators.required]), //boolen
			is_new: new FormControl(0, [Validators.required]), //boolen

			content_type_id: new FormControl('', [Validators.required]),
			// content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([]),
			series_genres: this.fb.array([]),

			// series_genres: this.fb.group({
			// 	content_type_id: new FormControl('', [Validators.required]),
			// 	genre_id: new FormControl('', [Validators.required]),
			// 	genre_order: new FormControl(1, [Validators.required]), // static value
			// }),
			tags: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		this.addForm.patchValue({
			content_type_id: this.contentTypeID
		})
		this.getSeriesGenres?.controls.forEach((item: any) => {
			item.controls.content_type_id.setValue(this.contentTypeID)
		});
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

	get getContentImgs() {
		return this.addForm.get('content_images') as FormArray
	}
	get getSeriesGenres() {
		return this.addForm.get('series_genres') as FormArray
	}

	getNeededList() {
		this._providerService.list().subscribe((resp) => {
			this.providerList = resp.body;
			this.cdr.markForCheck()
		})
		this._genresService.list().subscribe((resp) => {
			this.genreList = resp.body;
			this.cdr.markForCheck()
		})
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == 'series') {
					this.contentTypeID = item.id
				}
			});
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
	genreFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl('', [Validators.required]),
			genre_id: new FormControl(id, [Validators.required]),
			genre_order: new FormControl(order, [Validators.required]), // static value
		})
	}
	addGenreRow(param) {
		const series_genres = this.addForm.get('series_genres') as FormArray;
		series_genres.clear()
		for (let i = 0; i < param.length; i++) {
			series_genres.push(this.genreFormGroup(param[i], i + 1))
		}
	}
	formattedDate(dateParam: string) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		this.patchContentTypeID()
		let formData = this.addForm.value;
		formData['content_images'] = this.getContentImgs.value.filter((item: any) => item.img)
		formData['series_genres'] = this.addForm.value['series_genres']

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			return
		}
		this._seriesService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.clearValue = true
			this.toastr.success(resp.message + 'successfully');
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


