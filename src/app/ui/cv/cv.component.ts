import { Component, OnInit } from '@angular/core';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  private mimeType = 'image/svg+xml;charset=utf-8';
  private dimension = { width: 210, height: 297 };
  private fileName = 'Lebenslauf_Kaan_Keskinsoy.pdf';
  private pdf: jsPDF;
  private printSections: HTMLCollectionOf<Element>;
  private contactIconsElement: Element;
  private contactTextsElement: Element;

  printing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  printCV() {
    this.sendGAEvent('PDF', 'save', 'Curriculum Vitae');
    this.printing = true;
    this.printSections = document.getElementsByClassName('print-section');
    let promises = [];
    this.pdf = new jsPDF('p', 'mm', 'a4', true);
    this.contactIconsElement = document.getElementsByClassName('contact')[0];
    this.contactTextsElement = document.getElementsByClassName('contact-alt')[0];

    for (let i = 0; i < this.printSections.length; i++) {
      promises.push(html2canvas(this.printSections[i]));
    }

    this.hideElement(this.contactIconsElement);
    this.showElement(this.contactTextsElement);

    Promise.all(promises)
      .then((canvases: [HTMLCanvasElement]) => {
        canvases.map(this.appendToPDF, this);
      });
  }

  private appendToPDF(canvas: HTMLCanvasElement, index: number) {
    const contentDataURL = canvas.toDataURL(this.mimeType);
    this.pdf.addImage(contentDataURL, 'JPEG', 0, 0, this.dimension.width, this.dimension.height, null, 'FAST');
    if (index < this.printSections.length - 1) {
      this.pdf.addPage('a4', 'p');
    } else {
      this.pdf.save(this.fileName)
      this.showElement(this.contactIconsElement);
      this.hideElement(this.contactTextsElement);
      this.printing = false;
    }
  }

  private hideElement(element: Element): Element {
    element.className += ' hide';
    return element;
  }

  private showElement(element: Element): Element {
    element.className = element.className.replace(' hide', '');
    return element;
  }

  sendGAEvent(category: string, action: string, label: string, value?: number) {
    let event;
    if (!value) {
      event = { eventCategory: category, eventAction: action, eventLabel: label };
    } else {
      event = { eventCategory: category, eventAction: action, eventLabel: label, eventValue: value };
    }
    (<any>window).ga('send', 'event', event);
  }

}
