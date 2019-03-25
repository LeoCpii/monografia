import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'estudante-page',
  templateUrl: './estudante.page.html',
})

export class EstudantePage implements OnInit {

  constructor(private router: Router) { }

  public ir() {
    this.router.navigate(['perguntas', 'estudante']);
  }

  ngOnInit() { }
}
