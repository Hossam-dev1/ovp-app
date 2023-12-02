import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { ClipsService } from './../../../../../core/services/Clips-Module/clips.service';
import { CollectionService } from './../../../../../core/services/Collection-Module/collection.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { LangService } from './../../../../../core/services/lang.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

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
	contentTypesGroup: any[] = []
	addForm: FormGroup;
	isLoadingResults: boolean;
	lang: string = 'en'
	socialLink_list: string[] = []
	selectedContentTypeID: number;


	constructor(
		private fb: FormBuilder,
		private _collectionService: CollectionService,
		private _langService: LangService,
		private _helperService: HelperService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef,
		private _clipsService: ClipsService,
		private _seriesService: SeriesService,
	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.initForm()
		this.getNeededList()
	}

	protected get getContent() {
		return this.addForm.get('contents') as FormArray
	}
	protected get getAddForm() {
		return this.addForm.controls;
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

	private initForm() {
		this.addForm = this.fb.group({
			sorting_order: new FormControl(null, [
				Validators.required,
				Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')]),
			device_type_id: new FormControl('', [Validators.required]),
			display_type_id: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			contents: this.fb.array([this.patchContentGroup()]),
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
			this.clipsList = resp.body
		})
		this._seriesService.list().subscribe((resp) => {
			this.seriesList = resp.body
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
	addContentRow() {
		this.getContent.push(this.patchContentGroup())
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

	detectContentList(param) {
		// const contentTypeArr = this.addForm.get('contents') as FormArray;
		// contentTypeArr.clear()
		// for (let i = 0; i < param.length; i++) {
		// 	contentTypeArr.push(this.patchContentGroup(param[i].id, this.selectedContentTypeID))
		// }
	}

	submit() {
		const formData = this.addForm.value;
		delete formData['contentListControl']
		console.log('formData', formData);

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check all required fields');
			return
		}

		this._collectionService.add(formData).subscribe((resp) => {
			this.addForm.reset()
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

