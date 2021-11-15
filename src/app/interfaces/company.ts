export interface ICompany {
    title: string;
    company: string;
    department?: string;
    address: Address;
    heading: string;
    subheading?: string;
    recipient: Recipient;
    letter: Array<string>;
}

export interface Recipient {
    gender: 'm' | 'f';
    name: string;
    surname: string;
}

export interface Address {
    street: string;
    zip: string;
    city: string;
}

export class Company implements ICompany {
    title: string;
    company: string;
    department?: string;
    address: Address;
    heading: string;
    subheading?: string;
    recipient: Recipient;
    letter: Array<string>;

    constructor() {}
}
