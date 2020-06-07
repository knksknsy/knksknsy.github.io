import { Component, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  public today: Date;
  public production = false;
  public companies: Array<Company> = [];
  public company: Company = null;
  public data;

  public printing = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.production = environment.production
    this.today = new Date();
    if (!this.production) {
      this.http.get('../../../assets/data/companies.json').subscribe(data => {
        this.companies = <Company[]>data;
        this.company = this.companies[0];
        this.http.get('../../../assets/data/private.json').subscribe(data => {
          this.data = data;
        });
      });
    }
  }

  printCV() {

  }

}
