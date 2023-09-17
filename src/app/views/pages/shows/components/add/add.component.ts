import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from './../../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from './../../../../../core/services/Genre-Module/genre.service';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean
	contentTypeKey:string = 'shows'
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
			content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([this.contentImgsForm]),

			series_genres: this.fb.group({
				content_type_id: new FormControl('', [Validators.required]),
				genre_id: new FormControl('', [Validators.required]),
				genre_order: new FormControl(1, [Validators.required]), // static value
			}),
			tags: new FormControl([], [Validators.required]),
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


	patchContentImgs(): void {
		if (this.dimentionList.length > 0) {
			for (let i = 1; i < this.dimentionList.length; i++) {
				this.getContentImgs.push(this.contentImgsForm())
				this.cdr.markForCheck()
			}
			this.isDimentionReady = true
		}
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl('', [Validators.required]),
			dimention_id: new FormControl('', [Validators.required]),
		})
	}

	get getContentImgs() {
		return this.addForm.get('content_images') as FormArray
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
				if (item['key'] == this.contentTypeKey) {
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
	formattedDate(dateParam) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		let formData = this.addForm.value;
			formData['series_genres'] = [this.addForm.value['series_genres']]

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check all required field');
			return
		}
		this._seriesService.add(this.addForm.value).subscribe((resp) => {
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


