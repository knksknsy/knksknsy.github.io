import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {

    private isMobileSubject = new BehaviorSubject<boolean>(false);
    public isMobile$ = this.isMobileSubject.asObservable();

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
            .pipe(
                map(result => result.matches)
            )
            .subscribe(isMobile => {
                this.isMobileSubject.next(isMobile);
            });
    }

    public get isMobile(): boolean {
        return this.isMobileSubject.value;
    }

}
