import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter/filter.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiLoaderComponent} from './api-loader/api-loader.component';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {GalleryComponent} from './gallery/gallery.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AuthNoticeComponent} from './auth-notice/auth-notice.component';
import {SuccessModalComponent} from './success-model/success-modal.component';
import {NextPreviousListComponent} from './next-previous-list/next-previous-list.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PopupGalleryComponent} from './popup-gallery/popup-gallery.component';
import {GlobalNoticeComponent} from './global-notice/global-notice.component';
import {FormErrorComponent} from './form-error/form-error.component';
import {ListOptionsComponent} from './list-options/list-options.component';
import {NoRecordFoundComponent} from './no-record-found/no-record-found.component';
import {SoonComponent} from './soon/soon.component';
import {FormTextareaComponent} from './forms/form-textarea/form-textarea.component';
import {FormSelectComponent} from './forms/form-select/form-select.component';
import {FormInputComponent} from './forms/form-input/form-input.component';
import {FormRadioGroupComponent} from './forms/form-radio-group/form-radio-group.component';
import {FormShowComponent} from './forms/form-show/form-show.component';
import { FormUploadImageComponent } from './forms/form-upload-image/form-upload-image.component';
import { FormStatusComponent } from './forms/form-status/form-status.component';
import {MatMenuModule} from '@angular/material/menu';
import { FormDatePickerComponent } from './forms/form-date-picker/form-date-picker.component';
import { FormYearDatePickerComponent } from './forms/form-year-date-picker/form-year-date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
    declarations: [
        AuthNoticeComponent, GlobalNoticeComponent,
        FilterComponent, ApiLoaderComponent,
        DeleteModalComponent, GalleryComponent,
        SuccessModalComponent, NextPreviousListComponent, PopupGalleryComponent,
        FormErrorComponent, ListOptionsComponent, NoRecordFoundComponent, SoonComponent,
        FormTextareaComponent,
        FormSelectComponent,
        FormInputComponent,
        FormRadioGroupComponent,
        FormShowComponent,
        FormUploadImageComponent,
        FormStatusComponent,
        FormDatePickerComponent,
        FormYearDatePickerComponent,
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        RouterModule,
        FormsModule,
        MatDividerModule,
        MatRadioModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TranslateModule,
        MatDialogModule,
        ReactiveFormsModule,
        DragDropModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule,
        MatDatepickerModule,
        NgxMatSelectSearchModule,
        MatCheckboxModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
		MatNativeDateModule,
		MatGridListModule
    ],
    exports: [
        FilterComponent,
        ApiLoaderComponent,
        DeleteModalComponent,
        SuccessModalComponent,
        GalleryComponent,
        AuthNoticeComponent,
        GlobalNoticeComponent,
        NextPreviousListComponent,
        FormErrorComponent,
        ListOptionsComponent,
        NoRecordFoundComponent,
        SoonComponent,
        FormTextareaComponent,
        FormInputComponent,
        FormRadioGroupComponent,
        FormSelectComponent,
        FormShowComponent,
        FormUploadImageComponent,
        MatMenuModule,
        FormDatePickerComponent,
		FormYearDatePickerComponent,
		FormStatusComponent,
		MatGridListModule

    ]
})
export class SharedModule {
}
