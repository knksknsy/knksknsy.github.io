import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;

  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit() {
  }

  navigateRoute(url: string) {
    this.router.navigate([url])
      .then((s) => {
        if (!s) {
          if (this.navbarOpen) {
            this.navbarOpen = !this.navbarOpen
          }
        } else {
          if (this.navbarOpen) {
            this.navbarOpen = !this.navbarOpen;
          }
        }
      });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if (this.navbarOpen) {
      this.sendEvent('Navbar', 'toggled', 'opened');  
    } else {
      this.sendEvent('Navbar', 'toggled', 'closed');
    }
  }

  translateDE() {
    this.translate.use('de');
    this.sendEvent('I18N', 'changed', 'de');
  }

  translateEN() {
    this.translate.use('en');
    this.sendEvent('I18N', 'changed', 'en');
  }

  sendEvent(category: string, action: string, label: string, value?: number) {
    let event;
    if (!value) {
      event = { eventCategory: category, eventAction: action, eventLabel: label };
    } else {
      event = { eventCategory: category, eventAction: action, eventLabel: label, eventValue: value };
    }
    (<any>window).ga('send', 'event', event);
  }

}
