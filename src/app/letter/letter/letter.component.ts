import { Component, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import { GlobalsService } from '../../globals/globals.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  public today: Date;
  public companies: Array<Company> = [];
  public company: Company = null;

  private mimeType = 'image/svg+xml;charset=utf-8';
  private dimension = { width: 210, height: 297 };
  private pdf: jsPDF;
  private printSections: HTMLCollectionOf<HTMLElement>;

  public printing: boolean = false;

  constructor(public globals: GlobalsService) {
  }

  ngOnInit() {
    this.today = new Date();
    this.companies = this.globals.companies
    this.company = this.companies[0];
  }

  printLetter() {
    this.printing = true;
    this.printSections = <HTMLCollectionOf<HTMLElement>>(document.getElementsByClassName('print-section'));
    let promises = [];
    this.pdf = new jsPDF('p', 'mm', 'a4', true);
    this.pdf.internal.scaleFactor = 30;

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
      this.pdf.save(`Anschreiben_Kaan_Keskinsoy_${this.company.name.replace(' ', '_')}.pdf`);
      this.printing = false;
    }
  }

}
