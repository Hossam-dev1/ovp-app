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
		console.log('clip_object', this.clip_object);
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
			clip_year: this.clip_object['clip_year'],
			clip_puplish_date: this.clip_object['clip_puplish_date'],
			clip_puplish_end_date: this.clip_object['clip_puplish_end_date'],
			content_type_id: this.clip_object['content_type_id'],
			content_provider_id: this.clip_object['content_provider_id'],
			clip_watch_rating: this.clip_object['clip_watch_rating'],

			content_images: this.clip_object['content_images'],
			clip_companies: {
				company_id: this.clip_object['companies'][0]['id'],
				content_type_id: this.contentTypeID
			},
			clip_genres: {
				genre_id: this.clip_object['genres'][0]['id'],
				content_type_id: this.contentTypeID,
			},

			tags: [this.clip_object['tags'][0]['id']],
		});
		this.selectedClipYear = this.clip_object['clip_year']
		this.patchFormArrayValues()
		console.log(this.editForm.value);

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

			content_images: this.fb.array([]),

			clip_companies: this.fb.group({
				content_type_id: new FormControl('', [Validators.required]),
				company_id: new FormControl('', [Validators.required]),
				company_order: new FormControl(1, [Validators.required]), // static
			}),

			clip_genres: this.fb.group({
				content_type_id: new FormControl('', [Validators.required]),
				genre_id: new FormControl('', [Validators.required]),
				genre_order: new FormControl(1, [Validators.required]), // static
			}),

			clip_crews: this.fb.array([]),

			tags: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		const value = {
			content_type_id: this.contentTypeID,
			clip_companies: {
				content_type_id: this.contentTypeID
			},
			clip_genres: {
				content_type_id: this.contentTypeID
			},
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
			this.isDimentionReady = true
		}
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl(''),
			dimention_id: new FormControl(''),
		})
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
			// console.log('contentTypeID', this.getContentImgs);
		})

		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
	}


	formattedDate(dateParam) {
		const date = new Date(dateParam);
		return date?.toISOString().slice(0, 10);
	}
	submit() {

		const contentImg = this.getEditForm['content_images'].value;

		const isContentImgNull = contentImg.some(obj => obj.img == '');
		// Perform any additional actions here
		// return
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check all required field');
			return
		}
		const formData: any = {
			name: {
				en: this.getEditForm["name"].value["en"] || '',
				ar: this.getEditForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getEditForm["description"].value["en"] || '',
				ar: this.getEditForm["description"].value["ar"] || ''
			},
			slug: {
				en: this.getEditForm["slug"].value["en"] || '',
				ar: this.getEditForm["slug"].value["ar"] || ''
			},
			clip_year: this.getEditForm['clip_year'].value,
			clip_duration: this.getEditForm['clip_duration'].value,
			clip_status: Number(this.getEditForm['clip_status'].value),
			clip_puplish_date: this.formattedDate(this.getEditForm['clip_puplish_date'].value),
			clip_puplish_end_date: this.formattedDate(this.getEditForm['clip_puplish_end_date'].value),
			asset_id: this.getEditForm['asset_id'].value,
			smil_file: this.getEditForm['smil_file'].value,
			video_status: this.getEditForm['video_status'].value,
			clip_ftp_filename: this.getEditForm['clip_ftp_filename'].value,
			clip_filename: this.getEditForm['clip_filename'].value,
			content_type_id: this.getEditForm['content_type_id'].value,
			content_provider_id: Number(this.getEditForm['content_provider_id'].value),

			// content_images: this.getEditForm['content_images'].value,
			clip_companies: [this.getEditForm['clip_companies'].value],
			clip_genres: [this.getEditForm['clip_genres'].value],
			clip_crews: this.getEditForm['clip_crews'].value,
			tags: this.getEditForm['tags'].value,
		}
		if (!isContentImgNull) {
			formData.content_images = this.getEditForm['content_images'].value
		}
		this._clipsService.edit(this.clip_ID, formData).subscribe((resp) => {
			// this.editForm.reset()
			this.toastr.success(resp.message + 'successfully');
			this.cdr.markForCheck();
		},
			(error) => {
				console.log(error);
				this.toastr.error(error.error.errors.failed[0]);
				// this.toastr.error(error.error.errors);
				// const errorControll = Object.keys(error.error.errors).toString();
				// this.getEditForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.markForCheck();
			})
	}

}


