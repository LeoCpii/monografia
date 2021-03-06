import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {

  @Input() size = 'h2';

  public getClass(): string {
    return this.size;
  }
}