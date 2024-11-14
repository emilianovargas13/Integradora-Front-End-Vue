import { Image } from "@/kernel/types"

export type UpdateSupplierResourceDto = {
    id: number,
    supplierId: number,
    resourceId: number,
    name: string,
    description: string,
    unitPrice: number,
    unitMeasure: string,
    images: {
        mainImageDto?: Image,
        secondaryImages: Image[]
    }
}