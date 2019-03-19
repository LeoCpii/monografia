import { Component, Input } from '@angular/core';

@Component({
  selector: 'cc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() label: string;
  @Input() value: string;

}
