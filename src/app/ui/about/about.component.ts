import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faXing = faXing;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  constructor() { }

  ngOnInit() { }

  imageClicked() {
    let imageElement = document.getElementById('profile-picture');
    imageElement.className = imageElement.className.replace(' animated flipInY', '');
    imageElement.className += ' animated hinge';
    setTimeout(this.appendImage, 3000);
  }

  appendImage() {
    let imageElement = document.getElementById('profile-picture');
    imageElement.className = imageElement.className.replace(' hinge', ' flipInY');
  }

}
