import { Entity } from "@/kernel/types"

export type SupplierResource = Entity<number> & {
    id: number,
    name: string,
    resourceTypeIcon: string,
    resourceTypeName: string,
    resourceName: string,
    mainImage: string,
    price: number,
    measureUnit: string,
    status: boolean
}