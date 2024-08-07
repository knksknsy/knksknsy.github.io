import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalsService {
    readonly production: boolean = environment.production;
    public privateData;

    constructor(private http: HttpClient) {
        if (!this.production) {
            this.http.get('../../../assets/data/private.json').subscribe(privateData => {
                this.privateData = privateData;
            });
        }
    }

}
