import { SeriesModule } from './views/pages/series/series.module';
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
import { PermissionSettingConfig } from './core/Global/permissions/permission.setting.config';

let permissionSettingConfig = new PermissionSettingConfig();

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
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.genres_permissions,
				},
				loadChildren: () => import('./views/pages/genre/genre.module').then(m => m.GenreModule)
			},

			{
				path: "nationalities", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.nationalities_permissions,
				},
				loadChildren: () => import('./views/pages/nationalities/nationalities.module').then(m => m.NationalitiesModule)
			},

			{
				path: "crew_type", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.crewTypes_permissions,
				},
				loadChildren: () => import('./views/pages/crew-type/crew-type.module').then(m => m.CrewTypeModule)
			},

			{
				path: "crew", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.crews_permissions,
				},
				loadChildren: () => import('./views/pages/crew/crew.module').then(m => m.CrewModule)
			},
			{
				path: "company_type", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.companyTypes_permissions,
				},
				loadChildren: () => import('./views/pages/company-type/company-type.module').then(m => m.CompanyTypeModule)
			},
			{
				path: "company", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.companies_permissions,
				},
				loadChildren: () => import('./views/pages/company/company.module').then(m => m.CompanyModule)
			},
			{
				path: "clips", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/clip/clip.module').then(m => m.ClipModule)
			},
			{
				path: "movies", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/movies/movies.module').then(m => m.MoviesModule)
			},
			{
				path: "plays", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/plays/plays.module').then(m => m.PlaysModule)
			},
			{
				path: "content_provider", // <= Page URL ,
				loadChildren: () => import('./views/pages/content-provider/content-provider.module').then(m => m.ContentProviderModule)
			},
			{
				path: "tags", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.tags_permissions,
				},
				loadChildren: () => import('./views/pages/tags/tags.module').then(m => m.TagsModule)
			},
			{
				path: "series", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/series/series.module').then(m => m.SeriesModule)
			},
			{
				path: "shows", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/shows/shows.module').then(m => m.ShowsModule)
			},
			{
				path: "seasons", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/seasons/seasons.module').then(m => m.SeasonsModule)
			},
			{
				path: "episodes", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.clips_permissions,
				},
				loadChildren: () => import('./views/pages/episodes/episodes.module').then(m => m.EpisodesModule)
			},
			{
				path: "admins", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.admins_permissions,
				},
				loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)
			},
			{
				path: "roles", // <= Page URL ,
				canActivate: [PermissionsGuard],
				data: {
					permissions: permissionSettingConfig.roles_permissions,
				},
				loadChildren: () => import('./views/pages/roles/roles.module').then(m => m.RolesModule)
			},
			{
				path: "categories", // <= Page URL ,
				loadChildren: () => import('./views/pages/categories/categories.module').then(m => m.CategoriesModule)
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
