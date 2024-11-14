import { Entity } from "@/kernel/types";

export type Supplier = Entity<number> & {
    id: number,
    name: string,
    lada: string,
    phone: string,
    email: string,
    contactName: string,
    image: string,
    description: string,
    country: string,
    state: string,
    city: string,
    colony: string,
    street: string,
    postalCode: string,
    exteriorNumber: string,
    interiorNumber?: string,
    referenceDetails?: string,
    buildingType: string,
    status: boolean
}