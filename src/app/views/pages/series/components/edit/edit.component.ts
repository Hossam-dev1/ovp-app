import { HttpErrorResponse } from '@angular/common/http';
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
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	selectedValues: number[] = [2, 4, 6];

	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean
	series_ID: number;
	lang: string = 'en'
	selectedSeiresYear: string

	constructor(
		private fb: FormBuilder,
		private _langService: LangService,
		private _seriesService: SeriesService,
		private _genresService: GenreService,
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
	genreList: any[] = []
	crewList: any[] = []
	tagsList: any[] = []
	contentTypeID: number = null;

	series_object: any
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
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.series_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}
	getDataByID() {
		this._seriesService.show(this.series_ID).subscribe((resp: any) => {
			this.series_object = resp.body;
			this.patchSeriesData();
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchSeriesData() {
		const genresIDs = this.series_object['genres'].map((genre) => genre.id)

		this.editForm.patchValue({
			name: {
				en: this.series_object["name"]["en"],
				ar: this.series_object["name"]["ar"]
			},
			description: {
				en: this.series_object["name"]["en"],
				ar: this.series_object["name"]["ar"]
			},
			series_start_year: this.series_object['series_start_year'],
			series_no_of_seasons: this.series_object['series_no_of_seasons'],
			series_status: this.series_object['series_status'],
			is_exclusive: this.series_object['is_exclusive'],
			is_new: this.series_object['is_new'],
			content_provider_id: this.series_object['content_provider_id'],

			content_images: this.series_object['content_images'],
			genre_ids: genresIDs,

			tags: [this.series_object['tags'][0]['id']],
		});
		this.contentTypeID = this.series_object['content_type_id'];
		this.selectedSeiresYear = this.series_object['series_start_year']

		this.addGenreRow(genresIDs) //patch generes value
		this.cdr.markForCheck()
	}

	protected get geteditForm() {
		return this.editForm.controls;
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
			series_start_year: new FormControl('', [Validators.required]),
			series_no_of_seasons: new FormControl('', [Validators.required]),
			series_status: new FormControl(0, [Validators.required]), //boolen
			is_exclusive: new FormControl(0, [Validators.required]), //boolen
			is_new: new FormControl(0, [Validators.required]), //boolen

			content_type_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([this.contentImgsForm]),
			series_genres: this.fb.array([]),
			genre_ids: new FormControl([]),


			// series_genres: this.fb.group({
			// 	content_type_id: new FormControl('', [Validators.required]),
			// 	genre_id: new FormControl('', [Validators.required]),
			// 	genre_order: new FormControl(1, [Validators.required]), // static value
			// }),
			tags: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		this.editForm.patchValue({
			content_type_id: this.contentTypeID
		})
	}


	patchContentImgs(): void {
		console.log(this.dimentionList);

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
		return this.editForm.get('content_images') as FormArray
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
			this.patchContentTypeID()
			this.patchSeriesData();
			this.cdr.detectChanges()
		})

		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
	}

	getDimentionList() {
		const contentID = this.contentTypeID
		this._helperService.dimentionsList().subscribe((resp) => {
			this.dimentionList = resp.body;
			this.dimentionList = this.dimentionList.filter(item =>
				item['content_type']['id'] == contentID
			)

			this.patchContentImgs()
			this.cdr.markForCheck()
		})
	}

	genreFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID, [Validators.required]),
			genre_id: new FormControl(id, [Validators.required]),
			genre_order: new FormControl(order, [Validators.required]), // static value
		})
	}
	addGenreRow(param) {
		const series_genres = this.editForm.get('series_genres') as FormArray;
		series_genres.clear()
		for (let i = 0; i < param.length; i++) {
			series_genres.push(this.genreFormGroup(param[i], i + 1))
		}
	}

	formattedDate(dateParam) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		let formData = this.editForm.value;
		formData['series_genres'] = [this.editForm.value['series_genres']]
		console.log('this.editForm.value', this.editForm.value);

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check all required field');
			// return
		}
		this._seriesService.edit(this.series_ID, this.editForm.value).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this.cdr.markForCheck();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.cdr.markForCheck();
			})
	}

}


