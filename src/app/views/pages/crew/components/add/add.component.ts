import { LangService } from './../../../../../core/services/lang.service';
import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	btnLoading: boolean = false;

	// Data State
	crewTypesList: any[] = []
	nationalitiesList: any[] = []
	genderList: string[] = ['male', 'female']
	addForm: UntypedFormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;
	lang: string = 'en'
	socialLink_list: string[] = []

	constructor(
		private fb: UntypedFormBuilder,
		private _location:Location,
		private _crewService: CrewService,
		private _langService: LangService,
		private _crewTypeService: CrewTypeService,
		private _nationalitiesService: NationalitiesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.initForm()
		this.getTypesList()
		this.getNationalitiesList()
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
			gender: new UntypedFormControl('', [Validators.required]),
			birth_date: new UntypedFormControl('', [Validators.required]),
			death_date: new UntypedFormControl(''),
			social_links: this.fb.group({
				facebook: new UntypedFormControl(''),
				instagram: new UntypedFormControl(''),
				twitter: new UntypedFormControl(''),
				youtube: new UntypedFormControl(''),
				tiktok: new UntypedFormControl(''),
				snapchat: new UntypedFormControl(''),
			}),
			types: new UntypedFormControl([], [Validators.required]),
			thumb: new UntypedFormControl('', [Validators.required]),
			nationality_id: new UntypedFormControl('', [Validators.required]),
			name: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new UntypedFormControl('', [Validators.required]),
				ar: new UntypedFormControl('', [Validators.required]),
			}),
		});
	}

	getTypesList() {
		this._crewTypeService.list().subscribe((resp) => {
			this.crewTypesList = resp.body;
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}

	getNationalitiesList() {
		this._nationalitiesService.list().subscribe((resp) => {
			this.nationalitiesList = resp.body;
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}
	addCustomLink = (term) => (term);

	formattedDate(dateParam: string) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		this.btnLoading = true;
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			this.btnLoading = false;
			return
		}
		const formData = this.addForm.value;
		formData['birth_date'] = this.formattedDate(formData['birth_date'])
		if (formData['death_date']) {
			formData['death_date'] = this.formattedDate(formData['death_date'])
		} else {
			delete formData['death_date'];
		}

		this._crewService.add(formData).subscribe((resp) => {
			this.addForm.reset()
			this.clearImgSrc = true
			this.toastr.success(resp.message + ' successfully');
			this.btnLoading = false;
			this._location.back();
			this.cdr.detectChanges();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;
				// const errorControll = Object.keys(error.error.errors).toString();
				// this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}

