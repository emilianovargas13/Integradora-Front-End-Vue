import { Address } from "@/kernel/types"

export type SaveSupplierDto = {
    name: string,
    lada: string,
    phone: string,
    email: string,
    contactName: string,
    image: string,
    description?: string,
    address: Address
}