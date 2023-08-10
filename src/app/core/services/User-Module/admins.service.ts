import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {CmsUsersModel} from '../../models/User-Module/cms.users.model';
import {CmsUsersSerializer} from '../../Serializers/User-Module/cms.users.serializer';

@Injectable({
	providedIn: 'root'
})

export class AdminsService extends BaseService<CmsUsersModel> {
	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/admins',
			new CmsUsersSerializer());
	}

}
