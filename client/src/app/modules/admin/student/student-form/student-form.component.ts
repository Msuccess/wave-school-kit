import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentFormComponent implements OnInit {
    form: FormGroup;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(private _formBuilder: FormBuilder) {
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
        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.horizontalStepperStep2 = this._formBuilder.group({
            address: ['', Validators.required]
        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
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
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void {
        alert('You have finished the horizontal stepper!');
    }
}
