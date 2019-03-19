import { Component, Input } from '@angular/core';

@Component({
  selector: 'cc-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})

export class TextComponent {
  @Input() type?: string;

  public getClass(): string { 
    return this.type ? 'text-black-50' : '';
  }
}