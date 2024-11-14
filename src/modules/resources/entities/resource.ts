import { Entity } from "@/kernel/types";

export type Resource = Entity<number> &{
    id?: number
    name: string
    description: string
    resourceTypeId: number,
    resourceTypeName: string,
    expanded?: boolean
}