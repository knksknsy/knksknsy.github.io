import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CarouselConfig } from "ngx-bootstrap";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 0, noPause: false, pauseOnFocus: true, showIndicators: true } }
  ]
})
export class ProjectsComponent implements OnInit {

  constructor(public translate: TranslateService, public router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

}
