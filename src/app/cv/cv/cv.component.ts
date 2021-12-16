import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { GlobalsService } from '../../services/globals/globals.service';
import { faGithub, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faMobileAlt, faGlobe, faSave, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

// import * as jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faXing = faXing;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faGlobe = faGlobe;
  faSave = faSave;
  faLock = faLock;
  faUnlock = faUnlock;

  public isGerman: boolean;
  public path: string = './assets/cv/';
  public fileGerman: string = 'Lebenslauf_Kaan_Keskinsoy.pdf';
  public fileEnglish: string = 'CV_Kaan_Keskinsoy.pdf';

  // private pdf: jsPDF;
  // private mimeType = 'image/svg+xml;charset=utf-8';
  // private dimension = { width: 210, height: 297 };
  // private printSections: HTMLCollectionOf<HTMLElement>;
  // private contactIconsElement: Element;
  // private contactTextsElement: Element;
  
  public fileName: string;
  public isPublic: boolean = false;
  public printing: boolean = false;
  public today: Date;

  constructor(public translate: TranslateService, public globals: GlobalsService, public router: Router) { }

  ngOnInit(): void {
    this.today = new Date();
    this.isPublic = this.globals.production;

    this.setLanguage(this.translate.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setLanguage(event.lang);
    });

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
  }

  setLanguage(lang: string): void {
    if (lang === 'de') {
      this.isGerman = true;
    } else {
      this.isGerman = false;
    }
    this.fileName = this.isGerman ? this.fileGerman : this.fileEnglish;
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

  // printCV(): void {
  //   this.printing = true;
  //   this.printSections = <HTMLCollectionOf<HTMLElement>>(document.getElementsByClassName('print-section'));
  //   let promises = [];
  //   this.pdf = new jsPDF('p', 'mm', 'a4', true);

  //   if (this.isPublic) {
  //     this.contactIconsElement = document.getElementsByClassName('contact')[0];
  //     this.contactTextsElement = document.getElementsByClassName('contact-alt')[0];

  //     this.addAttributeToElement(this.contactIconsElement, 'hide');
  //     this.removeAttributeFromElement(this.contactTextsElement, 'hide');
  //   }

  //   for (let i = 0; i < this.printSections.length; i++) {
  //     promises.push(html2canvas(this.printSections[i]));
  //   }

  //   Promise.all(promises)
  //     .then((canvases: [HTMLCanvasElement]) => {
  //       canvases.map(this.appendToPDF, this);
  //     });
  // }

  // private appendToPDF(canvas: HTMLCanvasElement, index: number): void {
  //   const contentDataURL = canvas.toDataURL(this.mimeType);
  //   this.pdf.addImage(contentDataURL, 'JPEG', 0, 0, this.dimension.width, this.dimension.height, null, 'MEDIUM');
  //   if (index < this.printSections.length - 1) {
  //     this.pdf.addPage('a4', 'p');
  //   } else {
  //     this.pdf.save(this.fileName)
  //     this.printing = false;
  //     if (this.isPublic) {
  //       this.removeAttributeFromElement(this.contactIconsElement, 'hide');
  //       this.addAttributeToElement(this.contactTextsElement, 'hide');
  //     }
  //   }
  // }

  // private addAttributeToElement(element: Element, attribute: string): Element {
  //   element.className += ` ${attribute}`;
  //   return element;
  // }

  // private removeAttributeFromElement(element: Element, attribute: string): Element {
  //   element.className = element.className.replace(` ${attribute}`, '');
  //   return element;
  // }

}
