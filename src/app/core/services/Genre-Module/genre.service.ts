import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GenreService {

	constructor(private HttpClient: HttpClient) { }

	list(): Observable<any> {
		return this.HttpClient.get(environment.url() + 'admins/genres', {
			headers: { "Accept-Language": "all" },
		})
	}

	add(data): Observable<any> {
		return this.HttpClient.post(environment.url() + 'admins/genres', data, {
			headers: { "Accept-Language": "all" },
		})
	}

	show(id:number){
		return this.HttpClient.get(environment.url() + `admins/genres/${id}`, {
			headers: { "Accept-Language": "all" },
		})
	}

	edit(id:number, data): Observable<any> {
		return this.HttpClient.put(environment.url() + `admins/genres/${id}`, data, {
			headers: { "Accept-Language": "all" },
		})
	}

	delete(id:number){
		return this.HttpClient.delete(environment.url() + `admins/genres/${id}`, {
			headers: { "Accept-Language": "all" },
		})
	}
}
