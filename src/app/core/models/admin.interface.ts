import {MultiLanguageModel} from './Base/multi.language.model';

export interface Admin {
	message : string,
	body: {
		id:number,
		email: string ,
		name: MultiLanguageModel,
		token: string,
		expire_at: string,
	}
}
