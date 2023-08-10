import {Subscription} from 'rxjs';
// Angular
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// Layout
import {LayoutConfigService, SplashScreenService, TranslationService} from './core/_base/layout';
// language list
import {locale as enLang} from './core/_config/i18n/en';
import {locale as arLang} from './core/_config/i18n/ar';
import {LangService} from './core/services/lang.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'CMS';
	loader: boolean;
	private unsubscribe: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 * @param langService
	 */
	constructor(private translationService: TranslationService,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService,
				private langService: LangService) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		// register translations
		this.translationService.loadTranslations(enLang, arLang);
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
		this.langService.loadStyle();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
