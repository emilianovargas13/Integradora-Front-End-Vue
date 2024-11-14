import { PaginationDto } from "@/kernel/types"

export type GetSupplierResourcesPagedDto = {
    dto: {
        searchValue: string,
        supplierId: number,
        resourceTypeId?: number
    },
    pagination: PaginationDto
}