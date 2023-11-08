import { CollectionService } from './../../../../../core/services/Collection-Module/collection.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { LangService } from './../../../../../core/services/lang.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
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
	deviceTypesList: any[] = []
	contentTypeList: any[] = []
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
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.initForm()
		this.getDeviceTypesList()
		this.getContentTypeList()
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
			sorting_order: new FormControl(null, [
				Validators.required,
				Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')]),
			device_type_id: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			contents: this.fb.array([]),
			contentListControl: new FormControl()
		});
	}

	getContentTypeList() {
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypesGroup = this.contentTypeList.filter((item) =>
				item.key == 'clips' || item.key == 'series'
			)
			this.cdr.markForCheck()
		})
	}
	contentTypesOnChange(param) {
		if (param.value.key == 'clips') {
			this.contentList = this.contentTypeList.filter((item) =>
				item.key.includes('clips') ||
				item.key.includes('movies') ||
				item.key.includes('plays')
			)
		} else {
			this.contentList = this.contentTypeList.filter((item) =>
				item.key.includes('series') ||
				item.key.includes('shows')
			)
		}
		this.clearSelectedContentList()
		this.selectedContentTypeID = param.value.id
		return this.cdr.markForCheck()
	}

	clearSelectedContentList() {
		this.addForm.controls.contentListControl.reset()
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

	detectContentList(param) {
		const contentTypeArr = this.addForm.get('contents') as FormArray;
		contentTypeArr.clear()
		for (let i = 0; i < param.length; i++) {
			contentTypeArr.push(this.patchContentGroup(param[i].id, this.selectedContentTypeID))
		}
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

