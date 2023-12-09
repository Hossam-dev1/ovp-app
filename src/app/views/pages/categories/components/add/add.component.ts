import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { CategoriesService } from './../../../../../core/services/Clips-Module/categories.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {
	btnLoading: boolean = false;
	addForm: FormGroup;
	isLoadingResults: boolean
	isMainCategory: boolean = true
	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	categoryTypeList: string[] = [
		'Main Category',
		'Sub Category',
	]
	parentList: any[] = []
	constructor(
		private fb: FormBuilder,
		private _location: Location,
		private _categoriesService: CategoriesService,
		private toastr: ToastrService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit() {
		this.initForm()
		this.getParentCateogry();
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
			parent_id: new FormControl('')
		});
	}

	getParentCateogry() {
		this._categoriesService.list(this.headerParams).subscribe((resp) => {
			this.parentList = resp.body.filter((category) =>
				!category.parent

			)
			console.log(this.parentList);

		})
	}

	checkCategoryType(eventValue) {
		if (eventValue == 'Main Category') {
			return this.isMainCategory = true
		}
		return this.isMainCategory = false
	}

	submit() {
		this.btnLoading = true;
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		this.isMainCategory ? this.addForm.removeControl('parent_id') : false

		console.log(this.addForm.value);

		this._categoriesService.add(this.addForm.value).subscribe((resp) => {
			this.addForm.reset()
			this.toastr.success(resp.message + ' successfully');
			this.btnLoading = false;
			this._location.back();

		},
			(error) => {
				this.toastr.error(error.error.message);
				const errorControll = Object.keys(error.error.errors).toString();
				this.btnLoading = false;
				// this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}
