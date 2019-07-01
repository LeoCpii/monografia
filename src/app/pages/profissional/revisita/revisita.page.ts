import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessaoService } from 'src/app/shared/services/business-service/sessao.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProfissionalService } from 'src/app/shared/services/business-service/profissional.service';

@Component({
  selector: 'revisita-page',
  templateUrl: './revisita.page.html',
  styleUrls: ['./revisita.page.css']
})

export class RevisitaPage implements OnInit {

  constructor(
    private storage: StorageService,
    private sessaoService: SessaoService,
    private auth: AuthService,
    private profissonalService: ProfissionalService
  ) { }

  public isLoading = false;
  public response: any;
  public deuErro = false;

  public form = new FormGroup({
    email: new FormControl(),
  });

  public async obterSessao() {

    this.isLoading = true;
    this.deuErro = false;

    const params = {
      email: this.form.value.email
    };

    this.response = await this.sessaoService.obterSessaoPorEmail(params);

    if (this.response.status === 200) {

      const resultado =  this.response.description.resultado ? this.response.description.resultado : '';
      this.storage.setJson('token-resultado', resultado);
      this.storage.setJson('token-sessao', this.response.description._id);
      this.storage.setJson('token-profissional', this.response.description.profissional);

      this.response = await this.profissonalService.obterProfissional(this.response.description.profissional);

      this.storage.setJson('token-profissao', this.response.description.profissao._id);
    } else {
      this.deuErro = true;
      this.isLoading = false;
      return;
    }

    if (this.response.status === 200) {
      this.auth.redirecionar();
      this.isLoading = false;
    } else {
      this.deuErro = true;
      this.isLoading = false;
      return;
    }
  }

  ngOnInit() {

  }
}
