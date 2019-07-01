import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'boas-vindas-page',
  templateUrl: './boas-vindas.page.html',
  styleUrls: ['./boas-vindas.page.css']
})

export class BoasVindasPage implements OnInit {

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.storage.clear();
  }
}
