import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {CmsUsersModel} from '../../models/User-Module/cms.users.model';


export class CmsUsersSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): CmsUsersModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: CmsUsersModel): any {
		if (model.password){
			return {
				'id' : model.id,
				'email' : model.email,
				'is_active' : model.is_active,
				'name' : model.name,
				'password' : model.password,

				'roles' : model.roles,
			};
		}
		return {
			'id' : model.id,
			'email' : model.email,
			'is_active' : model.is_active,
			'name' : model.name,
			'roles' : model.roles,
		};
	}

	toFormData(object: any): FormData {
		return null;
	}

	public adapt(item: any): CmsUsersModel {
		let model =  new CmsUsersModel(item.id);
		model.name = item.name;
		model.email = item.email;
		model.is_active = item.is_active;
		model.roles = item.roles;
		return  model;
	}

	status(status): any {

		return {
			'is_active' : status,
		};
	}

}
