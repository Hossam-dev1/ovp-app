import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

	// Data State
	crewTypesList:any[]=[]
	nationalitiesList:any[]=[]

	addForm: FormGroup;
	isLoadingResults: boolean

	constructor(
		private fb: FormBuilder,
		private _crewService: CrewService,
		private _crewTypeService: CrewTypeService,
		private _nationalitiesService: NationalitiesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.initForm()
		this.getTypesList()
		this.getNationalitiesList()
	}

	protected get getAddForm() {
		return this.addForm.controls;
	}
	private initForm() {
		this.addForm = this.fb.group({
			gender: new FormControl('', [Validators.required]),
			birth_date: new FormControl('', [Validators.required]),
			death_date: new FormControl('', [Validators.required]),
			social_links: new FormControl([], [Validators.required]),
			types: new FormControl([], [Validators.required]),
			thumb: new FormControl('', [Validators.required]),
			nationality_id: new FormControl('', [Validators.required]),
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
		});
	}

	getTypesList(){
		this._crewTypeService.list().subscribe((resp)=>{
			this.crewTypesList = resp.body;
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}

	getNationalitiesList(){
		this._nationalitiesService.list().subscribe((resp)=>{
			this.nationalitiesList = resp.body;
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}

	formattedDate(dateParam){
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		console.log(this.getAddForm['thumb'].value);

		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			return
		}


		const formData = {
			gender: this.getAddForm['gender'].value,
			birth_date:  this.formattedDate(this.getAddForm['birth_date'].value),
			death_date:  this.formattedDate(this.getAddForm['death_date'].value),
			social_links: [this.getAddForm['social_links'].value],
			types: [this.getAddForm['types'].value],
			thumb: this.getAddForm['thumb'].value,
			nationality_id: this.getAddForm['nationality_id'].value,
			name: {
				en: this.getAddForm["name"].value["en"] || '',
				ar: this.getAddForm["name"].value["ar"] || ''
			},
			description: {
				en: this.getAddForm["description"].value["en"] || '',
				ar: this.getAddForm["description"].value["ar"] || ''
			}
		}
		this._crewService.add(formData).subscribe((resp) => {
			this.addForm.reset()
			this.toastr.success(resp.message + 'successfully');
		},
			(error) => {
				const errorControll = Object.keys(error.error.errors).toString();
				this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
				this.toastr.error(error.error.message);
			})
	}

}

