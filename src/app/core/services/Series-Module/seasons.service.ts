import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SeasonsService {
	isListChanged = new BehaviorSubject(false)
	requestOptions = {
		headers: new HttpHeaders({ "Accept-Language": "all" }),
	};

	constructor(private HttpClient: HttpClient) { }

	list(
		paginationParams?,
		series_id?
	): Observable<any> {
		let params = new HttpParams();
		if (paginationParams) {
			params = params.append("is_pagination", paginationParams.is_pagination);
		}
		if (series_id) {
			params = params.append("series_id", series_id);
		}
		params = params.append("is_pagination", String(1))
		return this.HttpClient.get(environment.url() + 'admins/seasons',
			{ params: params, headers: { "Accept-Language": "all" } })
	}

	add(data): Observable<any> {
		return this.HttpClient.post(environment.url() + 'admins/seasons', data)
	}

	show(id: number) {
		return this.HttpClient.get(environment.url() + `admins/seasons/${id}`, this.requestOptions)
	}

	edit(id: number, data): Observable<any> {
		return this.HttpClient.put(environment.url() + `admins/seasons/${id}`, data)
	}

	delete(id: number) {
		return this.HttpClient.delete(environment.url() + `admins/seasons/${id}`)
	}
}
