import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    constructor(private _httpClient: HttpClient) {}

    getTeachersList() {
        return this._httpClient.get('./assets/localData/teachers_list.json');
    }
}
