import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'

@Component({
  selector: 'cc-dropdown-content',
  templateUrl: './dropdown-content.component.html',
})

export class DropdownContentComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;

  @Output() valueOutput = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }

  public choose() {
    this.valueOutput.emit(this.value);
  }
}