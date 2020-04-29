import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    constructor(private _httpClient: HttpClient) {}

    getGenders(): Observable<any> {
        return this._httpClient.get('./assets/localData/gender_list.json');
    }

    getReligions(): Observable<any> {
        return this._httpClient.get('./assets/localData/religion_list.json');
    }

    getTerms(): Observable<any> {
        return this._httpClient.get('./assets/localData/terms_list.json');
    }
}
