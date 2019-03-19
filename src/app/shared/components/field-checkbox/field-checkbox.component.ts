import { Component, Input, Output, EventEmitter, Optional, Self, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'cc-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['./field-checkbox.component.css']
})
export class FieldCheckboxComponent implements OnInit, ControlValueAccessor {
    private static _nextId = 0;
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    @ViewChild('input') private input: ElementRef;

    constructor(
        @Optional() @Self() private controlDir: NgControl,
    ) {
        controlDir.valueAccessor = this;
    }

    @Input() id: string = 'fieldchk_' + (++ FieldCheckboxComponent._nextId);
    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() name: string;
    @Input() value: string;

    @Output() modelChange = new EventEmitter<string>();

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
