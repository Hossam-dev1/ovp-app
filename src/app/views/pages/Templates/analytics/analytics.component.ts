import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {shuffle} from 'lodash';
import {LayoutConfigService, SparklineChartOptions} from '../../../../core/_base/layout';
import {Widget4Data} from '../../../partials/content/widgets/widget4/widget4.component';

@Component({
	selector: 'kt-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	widget4_1: Widget4Data;
	widget4_2: Widget4Data;
	widget4_3: Widget4Data;
	widget4_4: Widget4Data;


	//data
	data1: any[] = [
		{
			name: 'Cyan',
			series: [
				{
					name: 5,
					value: 2650
				},
				{
					name: 10,
					value: 2800
				},
				{
					name: 15,
					value: 2000
				}
			]
		},
		{
			name: 'Yellow',
			series: [
				{
					name: 5,
					value: 2500
				},
				{
					name: 10,
					value: 3100
				},
				{
					name: 15,
					value: 2350
				}
			]
		}
	];
	data2: any[] = [
		{
			'name': 'Germany',
			'value': 40632,
			'extra': {
				'code': 'de'
			}
		},
		{
			'name': 'United States',
			'value': 50000,
			'extra': {
				'code': 'us'
			}
		},
		{
			'name': 'France',
			'value': 36745,
			'extra': {
				'code': 'fr'
			}
		},
		{
			'name': 'United Kingdom',
			'value': 36240,
			'extra': {
				'code': 'uk'
			}
		},
		{
			'name': 'Spain',
			'value': 33000,
			'extra': {
				'code': 'es'
			}
		},
		{
			'name': 'Italy',
			'value': 35800,
			'extra': {
				'code': 'it'
			}
		}
	];
	data3: any[] = [
		{
			'name': 'Germany',
			'value': 40632,
			'extra': {
				'code': 'de'
			}
		},
		{
			'name': 'United States',
			'value': 50000,
			'extra': {
				'code': 'us'
			}
		},
		{
			'name': 'France',
			'value': 36745,
			'extra': {
				'code': 'fr'
			}
		},
		{
			'name': 'United Kingdom',
			'value': 36240,
			'extra': {
				'code': 'uk'
			}
		},
		{
			'name': 'Spain',
			'value': 33000,
			'extra': {
				'code': 'es'
			}
		},
		{
			'name': 'Italy',
			'value': 35800,
			'extra': {
				'code': 'it'
			}
		}
	];
	data4: any[] = [
		{
			'name': 'Germany',
			'series': [
				{
					'name': '2010',
					'value': 40632,
					'extra': {
						'code': 'de'
					}
				},
				{
					'name': '2000',
					'value': 36953,
					'extra': {
						'code': 'de'
					}
				},
				{
					'name': '1990',
					'value': 31476,
					'extra': {
						'code': 'de'
					}
				}
			]
		},
		{
			'name': 'United States',
			'series': [
				{
					'name': '2010',
					'value': 0,
					'extra': {
						'code': 'us'
					}
				},
				{
					'name': '2000',
					'value': 45986,
					'extra': {
						'code': 'us'
					}
				},
				{
					'name': '1990',
					'value': 37060,
					'extra': {
						'code': 'us'
					}
				}
			]
		},
		{
			'name': 'France',
			'series': [
				{
					'name': '2010',
					'value': 36745,
					'extra': {
						'code': 'fr'
					}
				},
				{
					'name': '2000',
					'value': 34774,
					'extra': {
						'code': 'fr'
					}
				},
				{
					'name': '1990',
					'value': 29476,
					'extra': {
						'code': 'fr'
					}
				}
			]
		},
		{
			'name': 'United Kingdom',
			'series': [
				{
					'name': '2010',
					'value': 36240,
					'extra': {
						'code': 'uk'
					}
				},
				{
					'name': '2000',
					'value': 32543,
					'extra': {
						'code': 'uk'
					}
				},
				{
					'name': '1990',
					'value': 26424,
					'extra': {
						'code': 'uk'
					}
				}
			]
		}
	];
	data5: any[] = [
		{
			'name': 'Germany',
			'value': 40632,
			'extra': {
				'code': 'de'
			}
		},
		{
			'name': 'United States',
			'value': 50000,
			'extra': {
				'code': 'us'
			}
		},
		{
			'name': 'France',
			'value': 36745,
			'extra': {
				'code': 'fr'
			}
		},
		{
			'name': 'United Kingdom',
			'value': 36240,
			'extra': {
				'code': 'uk'
			}
		},
		{
			'name': 'Spain',
			'value': 33000,
			'extra': {
				'code': 'es'
			}
		},
		{
			'name': 'Italy',
			'value': 35800,
			'extra': {
				'code': 'it'
			}
		}
	];
	data6: any[] = [
		{
			'name': 'Germany',
			'value': 40632,
			'extra': {
				'code': 'de'
			}
		},
		{
			'name': 'United States',
			'value': 50000,
			'extra': {
				'code': 'us'
			}
		},
		{
			'name': 'France',
			'value': 36745,
			'extra': {
				'code': 'fr'
			}
		},
		{
			'name': 'United Kingdom',
			'value': 36240,
			'extra': {
				'code': 'uk'
			}
		},
		{
			'name': 'Spain',
			'value': 33000,
			'extra': {
				'code': 'es'
			}
		},
		{
			'name': 'Italy',
			'value': 35800,
			'extra': {
				'code': 'it'
			}
		}
	];
	// lang
	lang = 'ar';
	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Number';
	showYAxisLabel = true;
	autoScale: true;
	yAxisLabel = 'Color Value';
	timeline = true;
	// colors
	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	constructor(private trlanslation: TranslateService, private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit() {
		this.lang = this.trlanslation.currentLang;

		this.chartOptions();
	}

	onSelect(event) {

	}

	chartOptions(){
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};

		// @ts-ignore
		this.widget4_1 = shuffle([
			{
				pic: './assets/media/files/doc.svg',
				title: 'Metronic Documentation',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/jpg.svg',
				title: 'Project Launch Evgent',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Full Developer Manual For 4.7',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/javascript.svg',
				title: 'Make JS Development',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/zip.svg',
				title: 'Download Ziped version OF 5.0',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Finance Report 2016/2017',
				url: 'https://keenthemes.com.my/metronic',
			},
		]);
		// @ts-ignore
		this.widget4_2 = shuffle([
			{
				pic: './assets/media/users/100_4.jpg',
				username: 'Anna Strong',
				desc: 'Visual Designer,Google Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-brand'
			}, {
				pic: './assets/media/users/100_14.jpg',
				username: 'Milano Esco',
				desc: 'Product Designer, Apple Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-warning'
			}, {
				pic: './assets/media/users/100_11.jpg',
				username: 'Nick Bold',
				desc: 'Web Developer, Facebook Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-danger'
			}, {
				pic: './assets/media/users/100_1.jpg',
				username: 'Wilter Delton',
				desc: 'Project Manager, Amazon Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-success'
			}, {
				pic: './assets/media/users/100_5.jpg',
				username: 'Nick Stone',
				desc: 'Visual Designer, Github Inc.',
				url: 'https://keenthemes.com.my/metronic',
				buttonClass: 'btn-label-dark'
			},
		]);
		// @ts-ignore
		this.widget4_3 = shuffle([
			{
				icon: 'flaticon-pie-chart-1 kt-font-info',
				title: 'Metronic v6 has been arrived!',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$500',
				valueColor: 'kt-font-info'
			}, {
				icon: 'flaticon-safe-shield-protection kt-font-success',
				title: 'Metronic community meet-up 2019 in Rome.',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$1260',
				valueColor: 'kt-font-success'
			}, {
				icon: 'flaticon2-line-chart kt-font-danger',
				title: 'Metronic Angular 8 version will be landing soon..',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$1080',
				valueColor: 'kt-font-danger'
			}, {
				icon: 'flaticon2-pie-chart-1 kt-font-primary',
				title: 'ale! Purchase Metronic at 70% off for limited time',
				url: 'https://keenthemes.com.my/metronic',
				value: '70% Off!',
				valueColor: 'kt-font-primary'
			}, {
				icon: 'flaticon2-rocket kt-font-brand',
				title: 'Metronic VueJS version is in progress. Stay tuned!',
				url: 'https://keenthemes.com.my/metronic',
				value: '+134',
				valueColor: 'kt-font-brand'
			}, {
				icon: 'flaticon2-notification kt-font-warning',
				title: 'Black Friday! Purchase Metronic at ever lowest 90% off for limited time',
				url: 'https://keenthemes.com.my/metronic',
				value: '70% Off!',
				valueColor: 'kt-font-warning'
			}, {
				icon: 'flaticon2-file kt-font-focus',
				title: 'Metronic React version is in progress.',
				url: 'https://keenthemes.com.my/metronic',
				value: '+13%',
				valueColor: 'kt-font-focus'
			},
		]);
		// @ts-ignore
		this.widget4_4 = shuffle([
			{
				pic: './assets/media/client-logos/logo5.png',
				title: 'Trump Themes',
				desc: 'Make Metronic Development',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$2500',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo4.png',
				title: 'StarBucks',
				desc: 'Good Coffee & Snacks',
				url: 'https://keenthemes.com.my/metronic',
				value: '-$290',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo3.png',
				title: 'Phyton',
				desc: 'A Programming Language',
				url: 'https://keenthemes.com.my/metronic',
				value: '+$17',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo2.png',
				title: 'GreenMakers',
				desc: 'Make Green Development',
				url: 'https://keenthemes.com.my/metronic',
				value: '-$2.50',
				valueColor: 'kt-font-brand'
			}, {
				pic: './assets/media/client-logos/logo1.png',
				title: 'FlyThemes',
				desc: 'A Let\'s Fly Fast Again Language',
				url: 'https://keenthemes.com.my/metronic',
				value: '+200',
				valueColor: 'kt-font-brand'
			},
		]);
	}
}
