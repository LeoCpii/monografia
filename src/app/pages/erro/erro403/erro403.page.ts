import { Component, OnInit } from '@angular/core';
import { SessaoService } from 'src/app/shared/services/business-service/sessao.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'erro403-page',
  templateUrl: './erro403.page.html',
  styleUrls: ['./erro403.page.css']
})

export class Erro403Page implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() { }

  public async voltar() {
   this.auth.redirecionar();
  }
}
