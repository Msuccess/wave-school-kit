import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StudentService } from 'app/modules/admin/services/student.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-student-sidebar-filter',
    templateUrl: './student-sidebar-filter.component.html',
    styleUrls: ['./student-sidebar-filter.component.scss']
})
export class StudentSidebarFilterComponent implements OnInit {
    user: any;
    filterBy: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {StudentService} _studentService
     */
    constructor(private _studentService: StudentService) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.filterBy = this._studentService.filterBy || 'all';

        this._studentService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user) => {
                this.user = user;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void {
        this.filterBy = filter;
        this._studentService.onFilterChanged.next(this.filterBy);
    }
}
