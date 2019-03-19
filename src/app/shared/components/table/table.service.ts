import { Injectable } from '@angular/core';
import { Col } from './col';
import { TableComponent } from './table.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public tableComponent: TableComponent;

  public cols: Col[] = [];

  public addCol(col: Col) {
    this.cols.push(col);
  }

  public setTableComponent(tableComponent: TableComponent) {
    this.tableComponent = tableComponent;
  }
}
