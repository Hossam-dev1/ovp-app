import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
	selector: 'kt-success-modal',
	templateUrl: './success-modal.component.html',
	styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<SuccessModalComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: any
	) {
	}

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
