import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'cc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css', '../button/button.component.css',]
})

export class DropdownComponent implements OnInit {
  @Input() label: string;
  @Input('styleButton') styleButton?: string;
  @Input('size') size?: string;
  @Input() disabled: boolean = false;

  public isOpen: boolean = false;
  constructor(){}

  public ngOnInit(){}

  public open(): void{
    this.isOpen = !this.isOpen;
  }
  
  public getClass(): string {
      const cssClass: any = {};

      if (this.styleButton) {
          cssClass[`cc-btn-${this.styleButton}`] = true;
      } else {
          cssClass[`cc-btn-primary`] = true;
      }

      if (this.size === 'lg') {
          cssClass[`btn-lg`] = true;
      } else if(this.size === 'sm'){
          cssClass[`btn-sm`] = true;
      }

      return cssClass;
  }
}