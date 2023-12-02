import { BehaviorSubject } from 'rxjs';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { ClipsService } from './../../../../../core/services/Clips-Module/clips.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CollectionService } from './../../../../../core/services/Collection-Module/collection.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from './../../../../../core/services/helper.service';
import { LangService } from './../../../../../core/services/lang.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	// Data State
	clipsOptions = ['clips', 'plays', 'movies'];
	seriesOptions = ['series', 'shows'];
	clipsList: any[] = [];
	seriesList: any[] = [];
	seasonsList: any[] = [];
	episodesList: any[] = [];
	deviceTypesList: any[] = []
	displayTypesList: any[] = []
	mainContentTypeList: any[] = []
	contentList: any[] = []
	genderList: string[] = ['male', 'female']
	clipsGroup: string[] = ['clips', 'movies', 'plays']
	seriesGroup: string[] = ['series', 'shows']
	editForm: FormGroup;
	isLoadingResults: boolean = true;
	lang: string = 'en'
	socialLink_list: string[] = []
	selectedContentTypeID: number;
	collection_ID: number;
	collection_object: any;

	private isClipsListReady = new BehaviorSubject<boolean>(false);

	constructor(
		private fb: FormBuilder,
		private _collectionService: CollectionService,
		private _langService: LangService,
		private _helperService: HelperService,
		private toastr: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		private _clipsService: ClipsService,
		private _seriesService: SeriesService,
	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.initForm();
		this.getNeededList();
		this.isClipsListReady.subscribe((status) => {
			if (status) {
				this.getUrlID();
			}
		})
	}
	getUrlID() {
		// this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.collection_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this._collectionService.show(this.collection_ID).subscribe((resp: any) => {
			this.collection_object = resp.body;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		}, () => {
			this.patchCollectionData();
			this.isLoadingResults = false;
		});
	}

	patchCollectionData() {
		// patch contentType Data
		if (this.collection_object['clips'].length) {
			this.collection_object['clips'].forEach(content => {
				this.filterContentList('clips', content.content_type.id)
				this.addContentRow(content.id, content.content_type.id);
			});
		} if (this.collection_object['series'].length) {
			this.collection_object['series'].forEach(content => {
				this.filterContentList('series', content.content_type.id)
				this.addContentRow(content.id, content.content_type.id);
			});
		}

		this.editForm.patchValue({
			name: {
				en: this.collection_object["name"]["en"],
				ar: this.collection_object["name"]["ar"]
			},
			sorting_order: this.collection_object["sorting_order"],
			device_type_id: this.collection_object["device_type"]['id'],
			display_type_id: this.collection_object?.display_type?.id,
		});
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
		return this.editForm.controls;
	}

	protected get getContent() {
		return this.editForm.get('contents') as FormArray
	}
	private initForm() {
		this.editForm = this.fb.group({
			sorting_order: new FormControl('', [Validators.required]),
			device_type_id: new FormControl('', [Validators.required]),
			display_type_id: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			contents: this.fb.array([]),
			// contentListControl: new FormControl(),
			// contentTypeOption: new FormControl()
		});
	}

	getNeededList() {
		this._helperService.contentTypesList().subscribe((resp) => {
			this.mainContentTypeList = resp.body.filter((type: any) =>
				!type.key.includes('season') && !type.key.includes('episode')
			);
			this.cdr.markForCheck()
		})
		this._clipsService.list().subscribe((resp) => {
			this.clipsList = resp.body;
			this.isClipsListReady.next(true);
			this.cdr.markForCheck()
		})
		this._seriesService.list().subscribe((resp) => {
			this.seriesList = resp.body;
			this.cdr.detectChanges();
		})

		this._helperService.deviceTypesList().subscribe((resp) => {
			this.deviceTypesList = resp.body;
			this.cdr.markForCheck()
		})

		this._helperService.displayTypesList().subscribe((resp) => {
			this.displayTypesList = resp.body;
			this.cdr.markForCheck()
		})
	}

	contentTypesOnChange(contentType: any, index: number) {
		this.getContent.at(index).get('content_id').reset() // clear last value

		if (this.clipsOptions.includes(contentType.key)) { // clips
			// filter clips list by contentType ID
			this.contentList.splice(index, 1, this.clipsList.filter((item =>
				item.content_type_id == contentType.id
			)))
		} else if (this.seriesOptions.includes(contentType.key)) {
			// filter series list by contentType ID
			this.contentList.splice(index, 1, this.seriesList.filter((item =>
				item.content_type.id == contentType.id
			)))
		}
		return this.cdr.markForCheck()
	}

	filterContentList(contentKey: string, contentTypeID: number) {
		if (contentKey == 'clips') {
			this.contentList.push(this.clipsList.filter((item =>
				item.content_type_id == contentTypeID
			)))
		} else {
			this.contentList.push(this.seriesList.filter((item =>
				item.content_type.id == contentTypeID
			)))
		}
		return console.log('contentList', this.contentList);

	}

	addCustomLink = (term) => (term);
	addContentRow(contentID?: number, contentTypeID?: number) {
		this.getContent.push(this.patchContentGroup(contentID, contentTypeID))
	}
	removeContentwRow(i) {
		this.getContent.removeAt(i)
	}

	patchContentGroup(contentID?: number, contentTypeID?: number) {
		return this.fb.group({
			content_type_id: [contentTypeID, Validators.required],
			content_id: [contentID, Validators.required],
		})
	}

	detectContentList(contentList) {
		// const contentTypeArr = this.editForm.get('contents') as FormArray;
		// contentTypeArr.clear()
		// for (let i = 0; i < contentList.length; i++) {
		// 	contentTypeArr.push(this.patchContentGroup(contentList[i]?.id || contentList[i], this.selectedContentTypeID))
		// }

	}

	submit() {
		const formData = this.editForm.value;
		delete formData['contentListControl']
		delete formData['contentTypeOption']

		console.log('formData', formData);

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check all required fields');
			return
		}

		// return
		this._collectionService.edit(this.collection_ID, formData).subscribe((resp) => {
			// this.editForm.reset()
			this.toastr.success(resp.message + ' successfully');
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				// const errorControll = Object.keys(error.error.errors).toString();
				// this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}

