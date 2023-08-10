import {ModelBase} from '../Base/base.model';

export class CmsUsersModel extends ModelBase {

	public name:string;
	public email: string;
	public password: string;
	public is_active: boolean;

	public roles:[];

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'name' : this.name,
			'email' : this.email,
			'is_active': this.is_active,
			'roles_length' : this.roles.length,
		};
	}
}
