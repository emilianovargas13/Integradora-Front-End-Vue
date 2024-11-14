import { MultiselectOption } from "@/kernel/types"

export type CustomResourceDto = {
    id?: number
    name: string
    description: string
    expanded?: boolean
    resourceType: MultiselectOption
}
