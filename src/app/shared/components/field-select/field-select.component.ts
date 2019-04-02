import { Component, Input, OnInit, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'cc-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.css', './../field/field.component.css']
})
export class FieldSelectComponent implements OnInit, ControlValueAccessor {
    private static _nextId = 0;
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public messages = {
        required: 'Campo obrigatório',
        cpf: 'CPF inválido',
        cnpj: 'CNPJ inválido',
        cnpjcpf: 'CPF ou CNPJ inválido',
        date: 'Data inválida',
        datetime: 'Data inválida',
        month: 'Data inválida',
        number: 'Valor inválido',
        email: 'Email inválido',
        maxLength: 'Máximo de X caracteres',
        tel: 'Telefone inválido',
        ddd: 'DDD inválido'
    };

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
    @Input() keyLabel?: string;
    @Input() keyValue?: string;
    @Input() required = false;

    writeValue(value: string) {
        this.input.nativeElement.value = value;
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
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

        return key ? this.messages[key] : '';
    }

    ngOnInit() {
    }

}
