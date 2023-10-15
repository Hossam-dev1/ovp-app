// Angular
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// form controls and form builder
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
// RxJS
import {Observable, Subject} from 'rxjs';
// Auth
import {AuthService} from '../../../../core/services/auth.service';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {Admin} from '../../../../core/models/admin.interface';
import {HelperService} from '../../../../core/services/helper.service';
import {AccountPermissionsService} from '../../../../core/services/ACL-Module/account.permissions.service';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'admin@demo.com',
	PASSWORD: 'demo'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: UntypedFormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param AccountPermissionsService
	 * @param authNoticeService: AuthNoticeService
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 * @param helper
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private AccountPermissionsService: AccountPermissionsService,
		private authNoticeService: AuthNoticeService,
		private fb: UntypedFormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private helper: HelperService
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
		// initialize the login form
		this.initLoginForm();
		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initialization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			email: ['', Validators.compose(
				[
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			],
			password: ['', Validators.compose(
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		const authData = {
			email: controls['email'].value,
			password: controls['password'].value,
		};
		this.loading = true;
		this.auth.login(authData).subscribe(
			(resp: Admin) => {
				localStorage.setItem('token', resp.body.token);
				localStorage.setItem('name', resp.body.name?.en);
				localStorage.setItem('token_expired', String(resp.body.expire_at));

				this.cdr.markForCheck();
				// location.reload();
				this.getPermission();
			},
			(handler) => {
				this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
				this.loginForm.reset();
				this.loading = false;
			}
		);
	}


	getPermission() {
		console.log('getPermission');

		this.loading = true;
		this.AccountPermissionsService.list().subscribe(
			(resp) => {
				console.log('user resp', resp);

				let permissions = this.AccountPermissionsService.preparePermissions(resp);
				localStorage.setItem('permissions', JSON.stringify(permissions));
				this.cdr.markForCheck();
				location.reload();
				this.loading = false;
			},
			(handler) => {
				this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
				this.loginForm.reset();
				this.loading = false;
			}
		);
	}


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to validators name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
