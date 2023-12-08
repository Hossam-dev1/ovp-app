import { CategoriesService } from './../../../../core/services/Clips-Module/categories.service';
import { TagService } from './../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { ClipsService } from './../../../../core/services/Clips-Module/clips.service';
import { LangService } from './../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './../../../../core/services/Clips-Module/company.service';
import { GenreService } from './../../../../core/services/Genre-Module/genre.service';
import { CrewService } from './../../../../core/services/Crew-Module/crew.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clea: boolean

	lang: string = 'en'
	constructor(
		private fb: FormBuilder,
		private _langService: LangService,
		private _clipsService: ClipsService,
		private _companyService: CompanyService,
		private _genresService: GenreService,
		private _crewService: CrewService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private _providerService: ContentProviderService,
		private _helperService: HelperService,
		private _tagsService: TagService,
		private _categoriesService: CategoriesService,
	) { }


	// Data State
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
	contentTypeList: any[] = []
	dimentionList: any[] = []
	providerList: any[] = []
	companyList: any[] = []
	genreList: any[] = []
	crewList: any[] = []
	tagsList: any[] = []
	categoriesList: any[] = []
	contentTypeID: number = null;
	clip_ID: number;
	clip_object: any;
	selectedClipYear: string;
	editForm: FormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;

	isImgsUploaded: boolean = false;

	isListLoading: boolean = true
	isDimentionReady: boolean = false


	ngOnInit() {
		this.getUrlID()
		this.getNeededList()
		this.initForm()
		this.checkLocalLang();

	}

	convertLable(param: string, index: number = 0) {
		const requriedLabel = index == 0 ? ' *' : ''
		return param.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + requriedLabel;
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
			this.clip_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this._clipsService.show(this.clip_ID).subscribe((resp: any) => {
			this.clip_object = resp.body;
			this.patchClipData();
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchClipData() {
		const companiesIDs = this.clip_object['companies'].map((company) => company.id)
		const genresIDs = this.clip_object['genres'].map((company) => company.id)

		this.editForm.patchValue({
			name: {
				en: this.clip_object["name"]["en"],
				ar: this.clip_object["name"]["ar"]
			},
			description: {
				en: this.clip_object["name"]["en"],
				ar: this.clip_object["name"]["ar"]
			},
			slug: {
				en: this.clip_object["name"]["en"],
				ar: this.clip_object["name"]["ar"]
			},
			clip_duration: this.clip_object['clip_duration'],
			clip_status: this.clip_object['clip_status'],
			is_featured: this.clip_object['is_featured'] || false,
			clip_year: this.clip_object['clip_year'],
			clip_puplish_date: this.clip_object['clip_puplish_date'],
			clip_puplish_end_date: this.clip_object['clip_puplish_end_date'],
			content_type_id: this.clip_object['content_type_id'],
			//			content_provider_id: this.clip_object['content_provider_id'],
			clip_watch_rating: this.clip_object['clip_watch_rating'],
			company_ids: companiesIDs,
			genre_ids: genresIDs,
			content_images: this.clip_object['content_images'],

			tags: this.clip_object['tags'].map((tag) => tag.id),
			categories: this.clip_object.categories?.map((category) => category.id) || [],
		});
		this.selectedClipYear = this.clip_object['clip_year']
		this.contentTypeID = this.clip_object['content_type_id'];
		this.patchFormArrayValues()
		this.addCompanyRow(companiesIDs) //patch companies value
		this.addGenreRow(genresIDs) //patch generes value
	}
	protected get getEditForm() {
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

			clip_year: new FormControl('', [Validators.required]),
			clip_duration: new FormControl('', [Validators.required]),
			clip_status: new FormControl(false, [Validators.required]), //boolen
			is_featured: new FormControl(false, [Validators.required]), //boolen
			clip_puplish_date: new FormControl('', [Validators.required]),
			clip_puplish_end_date: new FormControl(''),
			clip_watch_rating: new FormControl('', [Validators.required]),

			asset_id: new FormControl('dfsdfdsfsdfsdgdsfsdfsd', [Validators.required]),
			smil_file: new FormControl('sadasfdsf', [Validators.required]),
			video_status: new FormControl('sfewegregfdgfdgdfgdfgdfgdf', [Validators.required]),
			clip_ftp_filename: new FormControl('fdsgdsgfdgdf', [Validators.required]),
			clip_filename: new FormControl('atbtab', [Validators.required]),

			content_type_id: new FormControl('', [Validators.required]),
			// content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([]),

			clip_companies: this.fb.array([]),
			company_ids: new FormControl([]),
			clip_genres: this.fb.array([]),
			genre_ids: new FormControl([]),

			clip_crews: this.fb.array([]),

			tags: new FormControl([], [Validators.required]),
			categories: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		const value = {
			content_type_id: this.contentTypeID,
		}

		this.editForm.patchValue(value)
	}
	get getCrews() {
		return this.editForm.get('clip_crews') as FormArray
	}

	crewForm(crewID?: number) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID || 1, [Validators.required]),
			crew_id: new FormControl(crewID || '', [Validators.required]),
			crew_order: new FormControl(1, [Validators.required]), // static
			is_star: new FormControl(false, [Validators.required]),
		})
	}

	patchFormArrayValues(): void {
		if (this.clip_object['crews'].length > 0) {
			for (let i = 0; i < this.clip_object['crews'].length; i++) {
				this.getCrews.push(this.crewForm(this.clip_object['crews'][i]['id']))
				this.cdr.markForCheck()
			}
		}
	}

	get getContentImgs() {
		return this.editForm.get('content_images') as FormArray
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
		this._companyService.list().subscribe((resp) => {
			this.companyList = resp.body;
			this.cdr.markForCheck()
		})
		this._crewService.list().subscribe((resp) => {
			this.crewList = resp.body;
			this.cdr.markForCheck()
		})
		this._genresService.list().subscribe((resp) => {
			this.genreList = resp.body;
			this.cdr.markForCheck()
		})
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == 'clips') {
					this.contentTypeID = item.id
					this.cdr.detectChanges()
					// console.log('contentTypeID', this.contentTypeID);
				}
			});
			this.patchContentTypeID()
			this.cdr.markForCheck()
		})
		this._helperService.dimentionsList().subscribe((resp) => {
			this.dimentionList = resp.body;
			this.dimentionList = this.dimentionList.filter(item =>
				item['content_type']['id'] == this.contentTypeID
			)
			this.cdr.markForCheck()
			this.patchContentImgs()
		})

		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
		this._categoriesService.list().subscribe((resp) => {
			this.categoriesList = resp.body;
			this.cdr.markForCheck()
		})
	}

	companyFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID, [Validators.required]),
			company_id: new FormControl(id, [Validators.required]),
			company_order: new FormControl(order, [Validators.required]), // static value
		})
	}

	addCompanyRow(param) {
		const clip_companies = this.editForm.get('clip_companies') as FormArray;
		clip_companies.clear()
		for (let i = 0; i < param.length; i++) {
			clip_companies.push(this.companyFormGroup(param[i], i + 1))
		}
		this.cdr.markForCheck();
	}

	genreFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID, [Validators.required]),
			genre_id: new FormControl(id, [Validators.required]),
			genre_order: new FormControl(order, [Validators.required]), // static value
		})
	}
	addGenreRow(param) {
		const clip_genres = this.editForm.get('clip_genres') as FormArray;
		clip_genres.clear()
		for (let i = 0; i < param.length; i++) {
			clip_genres.push(this.genreFormGroup(param[i], i + 1))
		}
	}
	formattedDate(dateParam: string) {
		const date = new Date(dateParam);
		return date?.toISOString().slice(0, 10);
	}
	submit() {
		console.log(this.editForm.value);

		const contentImg = this.getEditForm['content_images'].value;
		const isContentImgNull = contentImg.some(obj => obj.img == '');
		// Perform any additional actions here
		// return
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			return
		}
		const formData = this.editForm.value
		// Remove null values from the formControls array
		formData['content_images'] = this.getContentImgs.value.filter((item: any) => item.img)
		formData['clip_status'] = Number(this.getEditForm['clip_status'].value)
		formData['clip_watch_rating'] = (this.getEditForm['clip_watch_rating'].value).toString()
		formData['clip_puplish_date'] = this.formattedDate(this.getEditForm['clip_puplish_date'].value)
		formData['clip_puplish_end_date'] = this.formattedDate(this.getEditForm['clip_puplish_end_date'].value || null)

		if (!isContentImgNull) {
			formData.content_images = this.getEditForm['content_images'].value
		}
		this._clipsService.edit(this.clip_ID, formData).subscribe((resp) => {
			// this.editForm.reset()
			this.toastr.success(resp.message + ' successfully');
			this.cdr.markForCheck();
		},
			(error) => {
				console.log(error.error.message);
				this.toastr.error(error.error.message || 'something went wrong!');
				// this.toastr.error(error.error.errors);
				// const errorControll = Object.keys(error.error.errors).toString();
				// this.getEditForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.markForCheck();
			})
	}

}


