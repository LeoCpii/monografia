import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'estatistica-page',
  templateUrl: './estatistica.page.html',
})

export class EstatisticaPage implements OnInit {

  constructor(private router: Router) { }

  public ir() {
    this.router.navigate(['perguntas', 'estudante']);
  }

  ngOnInit() { }
}
