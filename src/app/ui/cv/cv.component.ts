import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  printCV() {
    var data = document.getElementsByClassName('print-section');
    html2canvas(data[0]).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'JPEG', 0, 0, 210, 297);
      return pdf;
    })
      .then(pdf => {
        html2canvas(data[1]).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
          pdf.addPage('a4', 'p');
          pdf.addImage(contentDataURL, 'JPEG', 0, 0, 210, 297);
          pdf.save('Lebenslauf_Kaan_Keskinsoy.pdf');
        });
      });
  }

}
