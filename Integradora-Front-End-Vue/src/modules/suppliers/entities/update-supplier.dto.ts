import { Address } from "@/kernel/types"

export type UpdateSupplierDto = {
    id: number,
    name: string,
    lada: string,
    phone: string,
    email: string,
    contactName: string,
    image?: string,
    url: string,
    description?: string,
    address: Address
}