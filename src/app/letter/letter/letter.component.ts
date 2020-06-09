import { Component, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import { environment } from '../../../environments/environment';
import { GlobalsService } from '../../globals/globals.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  public today: Date;
  public companies: Array<Company> = [];
  public company: Company = null;

  public printing = false;

  constructor(public globals: GlobalsService) {
  }

  ngOnInit() {
    this.today = new Date();
    this.companies = this.globals.companies
    this.company = this.companies[0];
  }

  printCV() {

  }

}
