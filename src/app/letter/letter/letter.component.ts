import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Company } from '../../interfaces/company';
import { GlobalsService } from '../../globals/globals.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faSave, faPen, faMapMarkerAlt, faMobileAlt, faEnvelope, faGlobe, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// import * as jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {
  faSave = faSave;
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faGlobe = faGlobe;
  faPlus = faPlus;
  faMinus = faMinus;

  public today: Date;
  public companies: Array<Company> = [];
  public company: Company;
  public companyForm: FormGroup;

  // private pdf: jsPDF;
  // private mimeType = 'image/svg+xml;charset=utf-8';
  // private dimension = { width: 210, height: 297 };
  // private printSections: HTMLCollectionOf<HTMLElement>;
  
  public paragraphItems: string[];
  public editEnabled: boolean = true;
  public printing: boolean = false;
  public uri;


  constructor(public globals: GlobalsService, private builder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.today = new Date();
    this.companies = this.globals.companies
    this.companies.sort((a,b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    this.company = this.companies[0];

    this.loadLetter('');
  }

  saveLetter() {
    this.updateEditEnabled(!this.editEnabled);
    this.companyForm.patchValue(this.companyForm.value);
    this.company = this.companyForm.value;

    let companyIndex = this.companies.map(el => el.title).indexOf(this.companyForm.get('title').value)
    if (companyIndex >= 0) {
      this.companies[companyIndex] = this.company
    } else {
      this.companies.push(this.company);
    }
    let json = JSON.stringify(this.companies);
    this.uri = "data:application/json;charset=UTF-8," + encodeURIComponent(json);
    this.uri = this.sanitizer.bypassSecurityTrustUrl(this.uri);
  }

  newLetter() {
    this.companyForm = this.builder.group({
      title: [''],
      heading: [''],
      subheading: [''],
      company: [''],
      department: [''],
      recipient: this.builder.group({
        gender: [''],
        name: [''],
        surname: [''],
      }),
      address: this.builder.group({
        street: [''],
        zip: [''],
        city: ['']
      }),
      letter: this.builder.array([''])
    });
  }


  loadLetter(target) {
    if (target === 'new') {
      this.company = new Company();
    }
    
    this.companyForm = this.builder.group({
      title: [this.company.title ? this.company.title : ''],
      heading: [this.company.heading ? this.company.heading : ''],
      subheading: [this.company.subheading ? this.company.subheading : ''],
      company: [this.company.company ? this.company.company : ''],
      department: [this.company.department ? this.company.department : ''],
      recipient: this.builder.group({
        gender: [this.company.recipient && this.company.recipient.gender ? this.company.recipient.gender : ''],
        name: [this.company.recipient && this.company.recipient.name ? this.company.recipient.name : ''],
        surname: [this.company.recipient && this.company.recipient.surname ? this.company.recipient.surname : ''],
      }),
      address: this.builder.group({
        street: [this.company.address && this.company.address.street ? this.company.address.street : ''],
        zip: [this.company.address && this.company.address.zip ? this.company.address.zip : ''],
        city: [this.company.address && this.company.address.city ? this.company.address.city : '']
      }),
      letter: this.builder.array(this.company.letter ? this.company.letter : [''])
    });

    this.uri = undefined;
    this.updateEditEnabled(true);
  }

  updateEditEnabled(value: boolean) {
    this.editEnabled = value;
  }

  get letterArray() {
    return this.companyForm.get('letter') as FormArray;
  }

  addParagraph() {
    this.letterArray.push(this.builder.control("Type..."));
  }

  removeParagraph() {
    this.letterArray.removeAt(this.letterArray.length - 1);
  }

  // printLetter() {
  //   this.printing = true;
  //   this.printSections = <HTMLCollectionOf<HTMLElement>>(document.getElementsByClassName('print-section'));
  //   let promises = [];
  //   this.pdf = new jsPDF('p', 'mm', 'a4', true);
  //   this.pdf.internal.scaleFactor = 30;

  //   for (let i = 0; i < this.printSections.length; i++) {
  //     promises.push(html2canvas(this.printSections[i]));
  //   }

  //   Promise.all(promises)
  //     .then((canvases: [HTMLCanvasElement]) => {
  //       canvases.map(this.appendToPDF, this);
  //     });
  // }

  // private appendToPDF(canvas: HTMLCanvasElement, index: number) {
  //   const contentDataURL = canvas.toDataURL(this.mimeType);

  //   this.pdf.addImage(contentDataURL, 'JPEG', 0, 0, this.dimension.width, this.dimension.height, null, 'MEDIUM');
  //   if (index < this.printSections.length - 1) {
  //     this.pdf.addPage('a4', 'p');
  //   } else {
  //     this.pdf.save(`Anschreiben_Kaan_Keskinsoy_${this.company.name.split(' ').join('_')}.pdf`);
  //     this.printing = false;
  //   }
  // }

}
