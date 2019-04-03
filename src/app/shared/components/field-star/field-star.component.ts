import { Component, Input, OnInit, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'cc-field-star',
    templateUrl: './field-star.component.html',
    styleUrls: ['./field-star.component.css']
})
export class FieldStarComponent implements OnInit, ControlValueAccessor {
    private static _nextId = 0;
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    @Input() id: string = 'fieldstar_' + (++ FieldStarComponent._nextId);
    @Input() label: string;
    @Input() disabled: boolean = false;
    @Input() name: string;
    @Input() value: string;
    @Input() inline?: boolean;

    @ViewChild('arrStar') starHtml: ElementRef<HTMLDivElement>;
    @ViewChild('input') private input: ElementRef;

    constructor(
        @Optional() @Self() private controlDir: NgControl,
    ) {
        controlDir.valueAccessor = this;
    }

    public get control() {
        return this.controlDir.control;
    }

    public selecionaNota(e): void {
        e.preventDefault();
        const nota = e.target.getAttribute('data-nota');

        this.colorirEstrelas(nota);
    }

    public colorirEstrelas(nota: number) {
        const partentStar = this.starHtml.nativeElement;
        const childStars = partentStar.childNodes;
        let contador = 0;

        childStars.forEach(element => {
            if (contador < nota) {
                partentStar.children[contador].classList.add('star-active', 'fa-star');
                partentStar.children[contador].classList.remove('fa-star-o');
            } else {
                partentStar.children[contador].classList.remove('star-active');
                partentStar.children[contador].classList.add('fa-star-o');
            }
            contador++;
        });
    }

    writeValue(value: string) {
        this.input.nativeElement.value = value;
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    ngOnInit() {

    }

    onBlur(value: string) {
        this.onTouched();
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
    }
}
