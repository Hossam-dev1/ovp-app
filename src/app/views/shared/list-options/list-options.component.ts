import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseService} from '../../../core/services/Base/base.service';
import {ModelBase} from '../../../core/models/Base/base.model';
import {AuthNoticeService} from '../../../core/services/auth-notice.service';
import {TranslateService} from '@ngx-translate/core';
import {HelperService} from '../../../core/services/helper.service';
import {IndexInterface} from '../Base-Interface/Index.Interface';
import {PaginateParams} from '../../../core/models/paginateParams.interface';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';
import {MatDialog} from '@angular/material';
import {RoutesName} from '../../../core/Global/routes.name';

@Component({
	selector: 'kt-list-options',
	templateUrl: './list-options.component.html',
	styleUrls: ['./list-options.component.scss']
})
export class ListOptionsComponent implements OnInit {

	@Input() element;

	@Input() currentService : BaseService<ModelBase> = null;

	@Input() currentComponent:IndexInterface = null;

	@Input() headerParams: PaginateParams;

	@Input() content_name: string;

	@Input() enabled_delete: boolean = true;

	@Input() enabled_edit: boolean = true;

	@Input() enabled_change_status: boolean = true;

	@Input() enabled_details: boolean = false;

	@Input() enabled_details_page: boolean = false;

	@Output() details_emitter = new EventEmitter<any>();


	constructor(private authNoticeService: AuthNoticeService,
				public translateService : TranslateService,
				public dialog: MatDialog,
				private helper: HelperService) {
	}

	ngOnInit() {
	}

	changeStatus(item){
		let is_active = !item.is_active;

		this.currentService.changeStatus(item.id, is_active).subscribe(res => {
			this.authNoticeService.setNotice(this.translateService.instant('COMMON.status_changed'), 'success');
			this.currentComponent.get(this.headerParams);
		}, handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
		});
	}

	deleteModal(item) {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '40rem',
			data: {
				title: this.translateService.instant('COMMON.Delete_Title',
					{name : this.content_name}),
				body: this.translateService.instant('COMMON.Delete_Body',
					{name : this.content_name, id: item.id}),
				name: this.content_name,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.currentService.delete(item.id).subscribe(res => {
					this.authNoticeService.setNotice(this.translateService.instant('COMMON.Deleted_successfully',
						{name : this.content_name}),
						'success');
					this.currentComponent.get(this.headerParams);
				}, handler => {
					this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
				});
			}
		});
	}


	detailsModal() {
		this.details_emitter.emit(this.element);
	}

	detailsPage(id: any) {
		return RoutesName.show() + '/' + id;
	}
}
