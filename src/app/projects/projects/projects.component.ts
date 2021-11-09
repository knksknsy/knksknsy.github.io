import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbCarousel, NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ProjectsComponent implements OnInit {

  @ViewChild('carousel') carousel: NgbCarousel;

  constructor(private config: NgbCarouselConfig, public translate: TranslateService, public router: Router) {
    this.config.interval = 0;
    this.config.keyboard = false;
  }

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
