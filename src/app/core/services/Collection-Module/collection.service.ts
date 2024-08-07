import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CollectionService {
	isListChanged = new BehaviorSubject(false)
	requestOptions = {
		headers: new HttpHeaders({ "Accept-Language": "all" }),
	};

	constructor(private HttpClient: HttpClient) { }

	list(
		paginationParams?
	): Observable<any> {
		let params = new HttpParams();
		if (paginationParams?.is_pagination) {
			params = params.append("is_pagination", paginationParams.is_pagination);
		}
		if (paginationParams?.active) {
			params = params.append("is_active", paginationParams.active);
		}
		//		params = params.append("is_pagination", String(1))
		return this.HttpClient.get(environment.url() + 'admins/collections',
			{ params: params, headers: { "Accept-Language": "all" } })
	}

	add(data): Observable<any> {
		return this.HttpClient.post(environment.url() + 'admins/collections', data)
	}

	show(id: number) {
		return this.HttpClient.get(environment.url() + `admins/collections/${id}`, this.requestOptions)
	}

	edit(id: number, data): Observable<any> {
		return this.HttpClient.put(environment.url() + `admins/collections/${id}`, data)
	}

	delete(id: number) {
		return this.HttpClient.delete(environment.url() + `admins/collections/${id}`)
	}
}

