import { Component, OnInit } from '@angular/core';
import { FormatterService } from './../../../shared/services/formatter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {

  constructor(private formatter: FormatterService) { }

  ngOnInit() {
  }

}
