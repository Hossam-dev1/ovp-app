import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { ClipsService } from './../../../../../core/services/Clips-Module/clips.service';
import { LangService } from './../../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { GenreService } from './../../../../../core/services/Genre-Module/genre.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
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
	contentTypeKey: string = 'movies'

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
		private _tagsService: TagService
	) { }


	// onSlideToggleChange(event: any) {
	// 	this.isStarChecked = event.checked ? true : false;
	// }


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
			slug: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			clip_year: new FormControl('', [Validators.required]),
			clip_duration: new FormControl('', [Validators.required]),
			clip_status: new FormControl(false, [Validators.required]), //boolen
			clip_puplish_date: new FormControl('', [Validators.required]),
			clip_puplish_end_date: new FormControl('', [Validators.required]),
			clip_watch_rating: new FormControl('', [Validators.required]),

			asset_id: new FormControl('dfsdfdsfsdfsdgdsfsdfsd', [Validators.required]),
			smil_file: new FormControl('sadasfdsf', [Validators.required]),
			video_status: new FormControl('sfewegregfdgfdgdfgdfgdfgdf', [Validators.required]),
			clip_ftp_filename: new FormControl('fdsgdsgfdgdf', [Validators.required]),
			clip_filename: new FormControl('atbtab', [Validators.required]),

			content_type_id: new FormControl('', [Validators.required]),
			content_provider_id: new FormControl('', [Validators.required]),

			content_images: this.fb.array([this.contentImgsForm]),

			clip_companies: this.fb.array([]),
			clip_genres: this.fb.array([]),

			clip_crews: this.fb.array([this.crewForm()]),

			tags: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		const value = {
			content_type_id: this.contentTypeID,
		}
		this.addForm.patchValue(value)
	}

	crewForm() {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID || 1, [Validators.required]),
			crew_id: new FormControl('', [Validators.required]),
			crew_order: new FormControl(1, [Validators.required]), // static value
			is_star: new FormControl(false, [Validators.required]),
		})
	}

	patchContentImgs(): void {
		if (this.dimentionList.length > 0) {
			for (let i = 1; i < this.dimentionList.length; i++) {
				this.getContentImgs.push(this.contentImgsForm())
				this.cdr.markForCheck()
			}
			this.isDimentionReady = true
		}
		// this.addForm.setControl('content_images', this.contentImgsForm());
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl('', [Validators.required]),
			dimention_id: new FormControl('', [Validators.required]),
		})
	}


	get getCrews() {
		return this.addForm.get('clip_crews') as FormArray
	}
	get getContentImgs() {
		return this.addForm.get('content_images') as FormArray
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
				if (item['key'] == this.contentTypeKey) {
					this.contentTypeID = item.id
				}
			});
			this.patchContentTypeID()
			this.getDimensionList();
			this.cdr.markForCheck()
		})
		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
	}

	getDimensionList() {
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

	companyFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID, [Validators.required]),
			company_id: new FormControl(id, [Validators.required]),
			company_order: new FormControl(order, [Validators.required]), // static value
		})
	}

	addCompanyRow(param) {
		const clip_companies = this.addForm.get('clip_companies') as FormArray;
		clip_companies.clear()
		for (let i = 0; i < param.length; i++) {
			clip_companies.push(this.companyFormGroup(param[i], i + 1))
		}
	}

	genreFormGroup(id, order) {
		return this.fb.group({
			content_type_id: new FormControl(this.contentTypeID, [Validators.required]),
			genre_id: new FormControl(id, [Validators.required]),
			genre_order: new FormControl(order, [Validators.required]), // static value
		})
	}
	addGenreRow(param) {
		const clip_genres = this.addForm.get('clip_genres') as FormArray;
		clip_genres.clear()
		for (let i = 0; i < param.length; i++) {
			clip_genres.push(this.genreFormGroup(param[i], i + 1))
		}
	}
	submit() {
		console.log(this.addForm.value);

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check all required field');
			return
		}
		const formData = this.addForm.value
			formData['clip_status'] = Number(this.getAddForm['clip_status'].value)
			formData['clip_puplish_date'] = this.formattedDate(this.getAddForm['clip_puplish_date'].value)
			formData['clip_puplish_end_date'] = this.formattedDate(this.getAddForm['clip_puplish_end_date'].value)

		this._clipsService.add(formData).subscribe((resp) => {
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


