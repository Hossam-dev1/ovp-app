// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { PermissionsGuard } from './core/guards/permissions.guard';
import { RoutesName } from './core/Global/routes.name';


const routes: Routes = [
	{ path: '', canActivate: [GuestGuard], loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: RoutesName.cms(),
		component: BaseComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always',
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},

			{
				path: "genre", // <= Page URL ,
				loadChildren: () => import('./views/pages/genre/genre.module').then(m => m.GenreModule)
			},

			{
				path: "nationalities", // <= Page URL ,
				loadChildren: () => import('./views/pages/nationalities/nationalities.module').then(m => m.NationalitiesModule)
			},

			{
				path: "crew_type", // <= Page URL ,
				loadChildren: () => import('./views/pages/crew-type/crew-type.module').then(m => m.CrewTypeModule)
			},

			{
				path: "crew", // <= Page URL ,
				loadChildren: () => import('./views/pages/crew/crew.module').then(m => m.CrewModule)
			},
			// admins
			// {
			// 	path: RoutesName.admins(), // <= Page URL ,
			// 	// canActivate: [PermissionsGuard],
			// 	// data: {
			// 	// 	permissions: permissionCatalogueConfig.product_permissions,
			// 	// },
			// 	loadChildren: () => import('./views/pages/modules/users/admins/admins.module')
			// 		.then(m => m.AdminsModule)
			// },


		]
	},

	{
		path: 'error/:type', component: ErrorPageComponent,
		data: {
			'type': 'error-v1',
			'code': 403,
			'title': '403... Access forbidden',
			'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
		}
	},
	{ path: '**', redirectTo: 'error/error-v1', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
