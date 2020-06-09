import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../interfaces/company'

@Injectable()
export class GlobalsService {
    readonly production: boolean = environment.production;
    privateData;
    companies: Array<Company> = [];

    constructor(private http: HttpClient) {
        if (!this.production) {
            this.http.get('../../../assets/data/private.json').subscribe(privateData => {
                this.privateData = privateData;
                this.http.get('../../../assets/data/companies.json').subscribe(companies => {
                    this.companies = <Company[]>companies;
                });
            });
        }
    }


}