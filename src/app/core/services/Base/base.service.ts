import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer } from '../../Serializers/Base/Serializer';
import { PaginateParams } from '../../models/paginateParams.interface';
import { ModelBase } from '../../models/Base/base.model';
import { ExportModel } from '../../models/Base/export.model';
import { ExportSerializer } from '../../Serializers/Base/export.serializer';


export class BaseService<T extends ModelBase> {
	isListChanged = new BehaviorSubject(false)

	constructor(
		protected http: HttpClient,
		protected url: string,
		protected endpoint: string,
		protected serializer: Serializer) { }

	public create(item: any): Observable<any> {
		return this.http
			.post<T>(`${this.url}${this.endpoint}`, item)
		// .pipe(map(data => this.serializer.fromJson(data) as T));
	}

	public createFormData(item: any): Observable<T> {
		return this.http
			.post<T>(`${this.url}${this.endpoint}`, this.serializer.toFormData(item))
			.pipe(map(data => this.serializer.fromJson(data) as T));
	}

	public update(id: number, item: any): Observable<any> {
		return this.http
			.put<T>(`${this.url}${this.endpoint}/${id}`, item)
			.pipe(map(data => this.serializer.fromJson(data)));
	}

	public changeStatus(id: number, status): Observable<T> {
		return this.http
			.put<T>(`${this.url}${this.endpoint}/${id}`,
				this.serializer.status(status))
			.pipe(map(data => this.serializer.fromJson(data) as T));
	}

	public updateFormData(id: number, item: any): Observable<any> {
		return this.http
			.post<T>(`${this.url}${this.endpoint}/${id}` + '?_method=PUT',
				this.serializer.toFormData(item))
			.pipe(map(data => this.serializer.fromJson(data) as T));
	}

	public get(id: number, get_all: boolean = true): Observable<any> {
		const headerDict = {
			'Accept-Language': (get_all) ? 'all' : localStorage.getItem('cms_lang'),
		};

		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};

		return this.http
			.get(`${this.url}${this.endpoint}/${id}`, requestOptions)
			.pipe(map((data: any) => data));
	}

	public list(paginationParams: PaginateParams, paginate = 1): Observable<any> {
		const params = {};
		if (paginationParams) {
			if (paginationParams.search_key) {
				params['search_key'] = paginationParams.search_key;
			}
			if (paginationParams.active) {
				params['is_active'] = paginationParams.active;
			}
			if (paginationParams.per_page) {
				params['per_page'] = paginationParams.per_page;
			}
			if (paginationParams.sort_order) {
				params['sort_order'] = paginationParams.sort_order;
			}
			if (paginationParams.next_page_index) {
				params['page'] = paginationParams.next_page_index + 1;
			}
			if (paginate) {
				params['is_pagination'] = 1;
			}
		}
		return this.http.get(`${this.url}${this.endpoint}`, {
			params: params
		})
	}

	public exportExcelSheet(paginationParams: PaginateParams): Observable<ExportModel> {
		let params = {};
		if (paginationParams) {
			if (paginationParams.search_key) { params['search_key'] = paginationParams.search_key; }
			if (paginationParams.active) { params['is_active'] = paginationParams.active; }
		}

		let exportSerializer = new ExportSerializer();

		return this.http.get(`${this.url}${this.endpoint}/sheet/export`, {
			params: params
		}).pipe(map((data: any) => exportSerializer.fromJson(data) as ExportModel));
	}

	public delete(id: number) {
		return this.http
			.delete(`${this.url}${this.endpoint}/${id}`);
	}

}
