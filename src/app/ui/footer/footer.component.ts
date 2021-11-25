import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faXing = faXing;

  constructor() { }

  ngOnInit() {
  }

}
