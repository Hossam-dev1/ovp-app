import { ActivatedRoute } from '@angular/router';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { CategoriesService } from './../../../../../core/services/Clips-Module/categories.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	btnLoading: boolean = false;
	editForm: FormGroup;
	isLoadingResults: boolean
	isMainCategory: boolean = true
	categoryDetails: any
	category_ID: number;
	categoryType: any;
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
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute

	) { }


	ngOnInit() {
		this.initForm()
		this.getParentCateogry();
		this.getUrlID()
	}

	protected get getAddForm() {
		return this.editForm.controls;
	}
	private initForm() {
		this.editForm = this.fb.group({
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			parent_id: new FormControl(''),
			category_type: new FormControl('')
		});
	}

	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.category_ID = Number(params.get('id'));
			this.getDetailsByID();
		});
	}

	getDetailsByID() {
		this._categoriesService.show(this.category_ID).subscribe((resp: any) => {
			this.categoryDetails = resp.body;
			this.isLoadingResults = false;
			this.patchCategoryData();
			this.cdr.markForCheck()
		})
	}

	patchCategoryData() {
		let editCategoryType: string;
		if (this.categoryDetails["parent"]) { // if category has parent
			this.isMainCategory = false // so it's sub category
			editCategoryType = 'Sub Category'
		} else {
			this.isMainCategory = true // so it's main category
			editCategoryType = 'Main Category'
		}
		this.editForm.patchValue({
			name: {
				en: this.categoryDetails["name"]["en"],
				ar: this.categoryDetails["name"]["ar"]
			},
			parent_id: this.categoryDetails["parent"]?.id || null,
			category_type: editCategoryType
		});
		this.cdr.detectChanges();
	}
	getParentCateogry() {
		this._categoriesService.list(this.headerParams).subscribe((resp) => {
			this.parentList = resp.body.filter((category) =>
				!category.parent
			)
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
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.btnLoading = false;
			return
		}
		this.isMainCategory ? this.editForm.removeControl('parent_id') : false
		this.editForm.removeControl('category_type');
		console.log(this.editForm.value);

		this._categoriesService.edit(this.category_ID, this.editForm.value).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this.btnLoading = false;
			this._location.back();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;
				const errorControll = Object.keys(error.error.errors).toString();
				this.getAddForm[errorControll].setErrors({ 'invalid': true })
				this.cdr.detectChanges();
			})
	}

}
