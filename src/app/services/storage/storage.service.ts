import { Injectable, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';

@Injectable()
export class StorageService implements OnInit {

	public storage: Storage;
	public keys: Array<string>;

	constructor() {
		this.storage = window.localStorage;
	}

	ngOnInit(): void { }

	getItem(key: string): Company | null {
		let item;
		try {
			item = <Company>JSON.parse(this.storage.getItem(key)!);
			return item!;
		} catch (e) {
			return null;
		}
	}

	getItems(): Array<Company> {
		let items: Array<Company> = [];

		this.getKeys().forEach((key) => {
			let item = this.getItem(key);
			if (item) {
				items.push(item!);
			}
		});

		items.sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});

		console.log('companies::', items);

		return items;
	}

	setItem(key: string, value: Company): void {
		this.storage.setItem(key, JSON.stringify(value));
	}

	setItems(items: Array<Company>): void {
		items.forEach((item) => {
			this.setItem(item.title, item);
		});
	}

	removeItem(key: string): void {
		this.storage.removeItem(key);
	}

	getKeys(): Array<string> {
		return Object.keys(this.storage);
	}

	setLanguage(lang: string): void {
		this.storage.setItem('lang', lang);
	}

	getLanguage(): string | null {
		return this.storage.getItem('lang');
	}

}
