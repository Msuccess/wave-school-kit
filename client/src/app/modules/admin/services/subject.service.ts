import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject, Observable } from 'rxjs';
import { SubjectModel } from '../models/subject.model';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve
} from '@angular/router';
import { FuseUtils } from '@fuse/utils';

@Injectable({
    providedIn: 'root'
})
export class SubjectService implements Resolve<any> {
    onSubjectsChanged = new BehaviorSubject<any>([]);
    onSelectedSubjectsChanged = new BehaviorSubject<any>([]);
    onSubjectDataChanged = new BehaviorSubject<any>([]);
    onSearchTextChanged = new Subject();
    onFilterChanged = new Subject();

    subjectDetails: any;
    searchText: any;
    filterBy: any;
    subjects: SubjectModel[];
    selectedSubjects: string[] = [];

    constructor(private _httpClient: HttpClient) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getSubjects(), this.getSubjectData('')]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe((searchText) => {
                        this.searchText = searchText;
                        this.getSubjects();
                    });

                    this.onFilterChanged.subscribe((filter) => {
                        this.filterBy = filter;
                        this.getSubjects();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    subjectEndPoint = environment.apiUrl + 'subject';

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */

    addSubject(subjectData: SubjectModel) {
        return this._httpClient.post(this.subjectEndPoint, subjectData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    getSubjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(this.subjectEndPoint)
                .subscribe((response: any) => {
                    this.subjects = response;

                    if (this.searchText && this.searchText !== '') {
                        this.subjects = FuseUtils.filterArrayByString(
                            this.subjects,
                            this.searchText
                        );
                    }

                    this.subjects = this.subjects.map((subjects) => {
                        return new SubjectModel(subjects);
                    });

                    this.onSubjectsChanged.next(this.subjects);
                    resolve(this.subjects);
                }, reject);
        });
    }

    getSubjectData(subjectID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(this.subjectEndPoint + '/' + subjectID)
                .subscribe((response: any) => {
                    this.subjectDetails = response;
                    this.onSubjectDataChanged.next(this.subjectDetails);
                    resolve(this.subjectDetails);
                }, reject);
        });
    }

    toggleSelectedSubjects(id): void {
        // First, check if we already have that subject as selected...
        if (this.selectedSubjects.length > 0) {
            const index = this.selectedSubjects.indexOf(id);

            if (index !== -1) {
                this.selectedSubjects.splice(index, 1);

                // Trigger the next event
                this.onSelectedSubjectsChanged.next(this.selectedSubjects);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedSubjects.push(id);

        // Trigger the next event
        this.onSelectedSubjectsChanged.next(this.selectedSubjects);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedSubjects.length > 0) {
            this.deselectSubjects();
        } else {
            this.selectSubjects();
        }
    }

    /**
     * Deselect Subjects
     */
    deselectSubjects(): void {
        this.selectedSubjects = [];

        // Trigger the next event
        this.onSelectedSubjectsChanged.next(this.selectedSubjects);
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectSubjects(filterParameter?, filterValue?): void {
        this.selectedSubjects = [];

        // If there is no filter, select all subjects
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedSubjects = [];
            this.subjects.map((subjects) => {
                this.selectedSubjects.push(subjects.id);
            });
        }

        // Trigger the next event
        this.onSelectedSubjectsChanged.next(this.selectedSubjects);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(subject): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(this.subjectEndPoint + subject.id, { ...subject })
                .subscribe((response) => {
                    this.getSubjects();
                    resolve(response);
                });
        });
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    // deleteContact(contact): void
    // {
    //     const contactIndex = this.contacts.indexOf(contact);
    //     this.contacts.splice(contactIndex, 1);
    //     this.onContactsChanged.next(this.contacts);
    // }

    /**
     * Delete selected contacts
     */
    // deleteSelectedContacts(): void
    // {
    //     for ( const contactId of this.selectedContacts )
    //     {
    //         const contact = this.contacts.find(_contact => {
    //             return _contact.id === contactId;
    //         });
    //         const contactIndex = this.contacts.indexOf(contact);
    //         this.contacts.splice(contactIndex, 1);
    //     }
    //     this.onContactsChanged.next(this.contacts);
    //     this.deselectContacts();
    // }

    // Error
    private handleError(result?: any) {
        let error;
        if (result.error instanceof ErrorEvent) {
            console.error('An error occurred:', result.error.message);
            error = result.error;
        } else {
            console.error(
                `Backend returned code ${result.status}, ` +
                    `body was: ${result.error}`
            );
            error = result.error;
        }
        return throwError(error);
    }
}
