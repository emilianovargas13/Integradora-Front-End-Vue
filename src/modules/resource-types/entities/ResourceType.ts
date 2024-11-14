import { Entity } from "@/kernel/types";

export type ResourceType = Entity<number> &{
    id?: number
    name: string
    description: string
    iconName: string
    status: boolean
    expanded?: boolean
}