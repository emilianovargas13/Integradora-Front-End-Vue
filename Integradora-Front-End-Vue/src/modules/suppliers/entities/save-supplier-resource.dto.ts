import { MultiselectOption } from "@/kernel/types"

export type SaveSupplierResourceDto = {
    supplierId: number,
    resource: MultiselectOption,
    name: string,
    description: string,
    unitPrice: number,
    unitMeasure: string,
    mainImage: string,
    secondaryImages: string[],
}