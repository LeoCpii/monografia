import { Component, Input, Output, EventEmitter, OnInit, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'cc-field-radio',
  templateUrl: './field-radio.component.html',
  styleUrls: ['./field-radio.component.css']
})
export class FieldRadioComponent implements OnInit, ControlValueAccessor {
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

    @Input() id: string = 'fieldradio_' + (++ FieldRadioComponent._nextId);
    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() name: string;
    @Input() value: string;
    @Input() inline?: boolean;

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

    ngOnInit() {

    }

}
