import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GenreService {
	isListChanged = new BehaviorSubject(false)

	requestOptions = {
		headers: new HttpHeaders({ "Accept-Language": "all" }),
	};
	constructor(private HttpClient: HttpClient) { }

	list(): Observable<any> {
		return this.HttpClient.get(environment.url() + 'admins/genres', {
			headers: { "Accept-Language": "all" },
		})
	}

	add(data): Observable<any> {
		return this.HttpClient.post(environment.url() + 'admins/genres', data)
	}

	show(id:number){
		return this.HttpClient.get(environment.url() + `admins/genres/${id}`, this.requestOptions)
	}

	edit(id:number, data): Observable<any> {
		return this.HttpClient.put(environment.url() + `admins/genres/${id}`, data)
	}

	delete(id:number){
		return this.HttpClient.delete(environment.url() + `admins/genres/${id}`)
	}
}
