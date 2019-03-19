import { Component, Input, OnInit, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'cc-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.css','./../field/field.component.css']
})
export class FieldSelectComponent implements OnInit, ControlValueAccessor {
    private static _nextId = 0;
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    @ViewChild('input') private input: ElementRef;

    constructor(
        @Optional() @Self() private controlDir: NgControl,
    ) {
        controlDir.valueAccessor = this;
    }

    public get control() {
        return this.controlDir.control;
    }

    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() data: any[];
    @Input() required = false

    writeValue(value: string) {
        this.input.nativeElement.value = value;
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
    }

    public onBlur(value: string) {
        this.onTouched();
    }

    public shouldDisplayError(): boolean {
        const control = this.controlDir.control;
        return (control.invalid && control.touched);
    }

    public getErrorMessage(): string {
        if (!this.shouldDisplayError()) {
            return '';
        }

        const key = Object.keys(this.control.errors).find(k => this.control.errors[k]);

        if (key === 'maxLength') {
            return this.messages.maxLength.replace('X', this.maxLength.toString());
        }

        return key ? this.messages[key] : '';
    }

    ngOnInit() {

    }

}
