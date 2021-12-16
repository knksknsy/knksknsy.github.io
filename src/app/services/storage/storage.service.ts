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

  getItem(key: string): Company {
    return <Company>JSON.parse(this.storage.getItem(key));
  }

  getItems(): Array<Company> {
    let items: Array<Company> = [];

    this.getKeys().forEach((key) => {
      items.push(this.getItem(key));
    });

    items.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

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

}
