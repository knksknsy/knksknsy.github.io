import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { faSave, faPen, faMapMarkerAlt, faMobileAlt, faEnvelope, faGlobe, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../interfaces/company';
import { GlobalsService } from '../../services/globals/globals.service';
import { StorageService } from '../../services/storage/storage.service';

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

  public fileUpload: File;
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

  constructor(public globals: GlobalsService, public storage: StorageService, private builder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.today = new Date();
    this.companies = this.storage.getItems();
    this.company = this.companies.length ? this.companies[0] : new Company();
    this.loadLetter();
  }

  saveLetter(): void {
    this.updateEditEnabled(!this.editEnabled);
    this.companyForm.patchValue(this.companyForm.value);
    this.company = this.companyForm.value;

    this.storage.setItem(this.company.title, this.company);

    this.exportStorage();
  }

  initForm(c: Company = new Company()): void {
    this.companyForm = this.builder.group({
      title: [c.title ? c.title : ''],
      heading: [c.heading ? c.heading : ''],
      subheading: [c.subheading ? c.subheading : ''],
      company: [c.company ? c.company : ''],
      department: [c.department ? c.department : ''],
      recipient: this.builder.group({
        gender: [c.recipient && c.recipient.gender ? c.recipient.gender : ''],
        name: [c.recipient && c.recipient.name ? c.recipient.name : ''],
        surname: [c.recipient && c.recipient.surname ? c.recipient.surname : ''],
      }),
      address: this.builder.group({
        street: [c.address && c.address.street ? c.address.street : ''],
        zip: [c.address && c.address.zip ? c.address.zip : ''],
        city: [c.address && c.address.city ? c.address.city : '']
      }),
      letter: this.builder.array(c.letter ? c.letter : [''])
    });
  }

  loadLetter(target=''): void {
    if (target === 'new') {
      this.company = new Company();
      this.company.title = 'UNTITLED';
    }
    this.initForm(this.company);
    
    this.exportStorage();
    this.updateEditEnabled(true);
  }

  importStorage(files: FileList): void {
    this.fileUpload = files.item(0);
    let fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      let companies: Array<Company> = JSON.parse(<string>fileReader.result);
      this.storage.setItems(companies);
      this.companies = this.storage.getItems();
      this.loadLetter();
    };
    fileReader.readAsText(this.fileUpload);
  }

  exportStorage(): void {
    let json: string = JSON.stringify(this.storage.getItems());
    this.uri = "data:application/json;charset=UTF-8," + encodeURIComponent(json);
    this.uri = this.sanitizer.bypassSecurityTrustUrl(this.uri);
  }

  updateEditEnabled(value: boolean): void {
    this.editEnabled = value;
  }

  get letterArray(): FormArray {
    return this.companyForm.get('letter') as FormArray;
  }

  addParagraph(): void {
    this.letterArray.push(this.builder.control("Type..."));
  }

  removeParagraph(): void {
    this.letterArray.removeAt(this.letterArray.length - 1);
  }

  // printLetter(): void {
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
