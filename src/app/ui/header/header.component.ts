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
  }

  translateDE() {
    this.translate.use('de');
  }

  translateEN() {
    this.translate.use('en');
  }

}
