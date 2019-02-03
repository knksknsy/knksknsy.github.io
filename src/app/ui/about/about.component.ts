import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
