import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { GlobalsService } from '../../globals/globals.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  public isGerman: boolean;
  public path = './assets/cv/';
  public fileGerman = 'Lebenslauf_Kaan_Keskinsoy.pdf';
  public fileEnglish = 'CV_Kaan_Keskinsoy.pdf';

  private mimeType = 'image/svg+xml;charset=utf-8';
  private dimension = { width: 210, height: 297 };
  private fileName: string;
  private pdf: jsPDF;
  private printSections: HTMLCollectionOf<HTMLElement>;
  private contactIconsElement: Element;
  private contactTextsElement: Element;

  isPublic: boolean = false;
  printing: boolean = false;
  public today: Date;

  constructor(public translate: TranslateService, public globals: GlobalsService, public router: Router) { }

  ngOnInit() {
    this.today = new Date();
    this.isPublic = this.globals.production;

    this.setLanguage(this.translate.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setLanguage(event.lang);
    });

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
  }

  setLanguage(lang: string) {
    if (lang === 'de') {
      this.isGerman = true;
    } else {
      this.isGerman = false;
    }
    this.fileName = this.isGerman ? this.fileGerman : this.fileEnglish;
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

  printCV() {
    this.printing = true;
    this.printSections = <HTMLCollectionOf<HTMLElement>>(document.getElementsByClassName('print-section'));
    let promises = [];
    this.pdf = new jsPDF('p', 'mm', 'a4', true);

    if (this.isPublic) {
      this.contactIconsElement = document.getElementsByClassName('contact')[0];
      this.contactTextsElement = document.getElementsByClassName('contact-alt')[0];

      this.addAttributeToElement(this.contactIconsElement, 'hide');
      this.removeAttributeFromElement(this.contactTextsElement, 'hide');
    }

    for (let i = 0; i < this.printSections.length; i++) {
      promises.push(html2canvas(this.printSections[i]));
    }

    Promise.all(promises)
      .then((canvases: [HTMLCanvasElement]) => {
        canvases.map(this.appendToPDF, this);
      });
  }

  private appendToPDF(canvas: HTMLCanvasElement, index: number) {
    const contentDataURL = canvas.toDataURL(this.mimeType);
    this.pdf.addImage(contentDataURL, 'JPEG', 0, 0, this.dimension.width, this.dimension.height, null, 'MEDIUM');
    if (index < this.printSections.length - 1) {
      this.pdf.addPage('a4', 'p');
    } else {
      this.pdf.save(this.fileName)
      this.printing = false;
      if (this.isPublic) {
        this.removeAttributeFromElement(this.contactIconsElement, 'hide');
        this.addAttributeToElement(this.contactTextsElement, 'hide');
      }
    }
  }

  private addAttributeToElement(element: Element, attribute: string): Element {
    element.className += ` ${attribute}`;
    return element;
  }

  private removeAttributeFromElement(element: Element, attribute: string): Element {
    element.className = element.className.replace(` ${attribute}`, '');
    return element;
  }

}
