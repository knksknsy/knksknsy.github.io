export interface Company {
    name: string;
    department?: string;
    address: Address;
    heading: string;
    counterpart: Counterpart;
    letter: Array<string>;
}

export interface Counterpart {
    gender: 'm' | 'f';
    name: string;
    surname: string;
}

export interface Address {
    street: string;
    zip: string;
    city: string;
}