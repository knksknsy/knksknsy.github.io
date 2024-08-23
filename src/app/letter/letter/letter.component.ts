import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { faSave, faPen, faMapMarkerAlt, faMobileAlt, faEnvelope, faGlobe, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../interfaces/company';
import { GlobalsService } from '../../services/globals/globals.service';
import { StorageService } from '../../services/storage/storage.service';

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

    public fileUpload: File | null; 
    public today: Date;
    public companies: Array<Company> = [];
    public company: Company;
    public companyForm: FormGroup;

    public paragraphItems: string[];
    public editEnabled: boolean = true;
    public printing: boolean = false;
    public uri: any;

    constructor(public globals: GlobalsService,
                public storage: StorageService,
                private builder: FormBuilder,
                private sanitizer: DomSanitizer) { }

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
            title: [c?.title ?? ''],
            heading: [c?.heading ?? ''],
            subheading: [c?.subheading ?? ''],
            company: [c?.company ?? ''],
            department: [c?.department ?? ''],
            recipient: this.builder.group({
                gender: [c?.recipient?.gender ?? ''],
                name: [c?.recipient?.name ?? ''],
                surname: [c?.recipient?.surname ?? ''],
            }),
            address: this.builder.group({
                street: [c?.address?.street ?? ''],
                zip: [c?.address?.zip ?? ''],
                city: [c?.address?.city ?? '']
            }),
            letter: this.builder.array(c?.letter ?? [''])
        });
    }

    loadLetter(event?: Event): void {
        const target: string = (event?.target as HTMLSelectElement)?.value;
        if (target && target === 'new') {
            this.company = new Company();
            this.company.title = 'UNTITLED';
        }
        this.initForm(this.company);

        this.exportStorage();
        this.updateEditEnabled(true);
    }

    importStorage(event: Event): void {
        const files: FileList  = (event.target as HTMLInputElement)?.files!;
        this.fileUpload = files.item(0);
        let fileReader: FileReader = new FileReader();
        fileReader.onload = (e) => {
        let companies: Array<Company> = JSON.parse(<string>fileReader.result);
        this.storage.setItems(companies);
        this.companies = this.storage.getItems();
        this.loadLetter();
        };
        fileReader.readAsText(this.fileUpload!);
    }

    exportStorage(): void {
        let json: string = JSON.stringify(this.storage.getItems());
        this.uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(json);
        this.uri = this.sanitizer.bypassSecurityTrustUrl(this.uri);
    }

    updateEditEnabled(value: boolean): void {
        this.editEnabled = value;
    }

    addParagraph(): void {
        this.letterArray.push(this.builder.control(''));
    }

    removeParagraph(): void {
        this.letterArray.removeAt(this.letterArray.length - 1);
    }

    get letterArray(): FormArray {
        return this.companyForm.get('letter') as FormArray;
    }

}
