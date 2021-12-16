import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from '../../services/globals/globals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navbarOpen = false;

  constructor(public translate: TranslateService, private router: Router, public globals: GlobalsService) { }

  navigateRoute(url: string): void {
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

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
    if (this.navbarOpen) {
      this.sendGAEvent('Navbar', 'toggled', 'opened');  
    } else {
      this.sendGAEvent('Navbar', 'toggled', 'closed');
    }
  }

  translateDE(): void {
    this.translate.use('de');
    this.sendGAEvent('I18N', 'changed', 'de');
  }

  translateEN(): void {
    this.translate.use('en');
    this.sendGAEvent('I18N', 'changed', 'en');
  }

  sendGAEvent(category: string, action: string, label: string, value?: number): void {
    let event;
    if (!value) {
      event = { eventCategory: category, eventAction: action, eventLabel: label };
    } else {
      event = { eventCategory: category, eventAction: action, eventLabel: label, eventValue: value };
    }
    (<any>window).ga('send', 'event', event);
  }

}
