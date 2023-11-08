import { HttpErrorResponse } from '@angular/common/http';
import { CollectionService } from './../../../../../core/services/Collection-Module/collection.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from './../../../../../core/services/helper.service';
import { LangService } from './../../../../../core/services/lang.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
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
	deviceTypesList: any[] = []
	contentTypeList: any[] = []
	contentList: any[] = []
	contentTypesGroup: any[] = []
	genderList: string[] = ['male', 'female']
	clipsGroup: string[] = ['clips', 'movies', 'plays']
	seriesGroup: string[] = ['series', 'shows']
	editForm: FormGroup;
	isLoadingResults: boolean;
	lang: string = 'en'
	socialLink_list: string[] = []
	selectedContentTypeID: number;
	collection_ID: number;
	collection_object: any;


	constructor(
		private fb: FormBuilder,
		private _collectionService: CollectionService,
		private _langService: LangService,
		private _crewTypeService: CrewTypeService,
		private _helperService: HelperService,
		private toastr: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.initForm()
		this.getUrlID();
		this.getDeviceTypesList()
		this.getContentTypeList()
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.collection_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}

	getDataByID() {
		this._collectionService.show(this.collection_ID).subscribe((resp: any) => {
			this.collection_object = resp.body;
			this.isLoadingResults = false;
			this.patchCollectionData();
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchCollectionData() {
		let selectedContentTypeOption;
		let selectedContentList;
		if (this.collection_object?.clips.length) {
			selectedContentTypeOption = 'clips'
			this.filterContentListBy(this.clipsGroup)
			selectedContentList = this.collection_object?.clips.map((item) =>
				item.content_type.id
			)
		} else {
			selectedContentTypeOption = 'series'
			this.filterContentListBy(this.seriesGroup)
			selectedContentList = this.collection_object?.series.map((item) =>
				item.content_type.id
			)
		}

		this.selectedContentTypeID = selectedContentList[0]
		this.editForm.patchValue({
			name: {
				en: this.collection_object["name"]["en"],
				ar: this.collection_object["name"]["ar"]
			},
			sorting_order: this.collection_object["sorting_order"],
			device_type_id: this.collection_object["device_type"]['id'],
			contentTypeOption: selectedContentTypeOption,
			contentListControl: selectedContentList
		});
		this.detectContentList(selectedContentList)

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
	private initForm() {
		this.editForm = this.fb.group({
			sorting_order: new FormControl('', [Validators.required]),
			device_type_id: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			contents: this.fb.array([]),
			contentListControl: new FormControl(),
			contentTypeOption: new FormControl()
		});
	}

	getContentTypeList() {
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypesGroup = this.contentTypeList.filter((item) =>
				item.key == 'clips' || item.key == 'series'
			)
			this.patchCollectionData();
			this.cdr.markForCheck()
		})
	}
	contentTypesOnChange(param) {
		if (param.value == 'clips') {
			this.filterContentListBy(this.clipsGroup)
		} else {
			this.filterContentListBy(this.seriesGroup)
		}
		this.clearSelectedContentList()
		this.selectedContentTypeID = param.value.id
		return this.cdr.markForCheck()
	}
	filterContentListBy(param: string[]) {
		this.contentList = this.contentTypeList.filter((item) =>
			item.key.includes(param[0]) ||
			item.key.includes(param[1]) ||
			item.key.includes(param[2])
		)
	}

	clearSelectedContentList() {
		this.editForm.controls.contentListControl.reset()
	}
	getDeviceTypesList() {
		this._helperService.deviceTypesList().subscribe((resp) => {
			this.deviceTypesList = resp.body;
			this.cdr.markForCheck()
		})
	}

	addCustomLink = (term) => (term);

	patchContentGroup(contentID: number, contentTypeID: number) {
		return this.fb.group({
			content_type_id: [contentTypeID, Validators.required],
			content_id: [contentID, Validators.required],
		})
	}

	detectContentList(contentList) {
		const contentTypeArr = this.editForm.get('contents') as FormArray;
		contentTypeArr.clear()
		for (let i = 0; i < contentList.length; i++) {
			contentTypeArr.push(this.patchContentGroup(contentList[i]?.id || contentList[i], this.selectedContentTypeID))
		}

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
			this.editForm.reset()
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

