import { Entity } from "@/kernel/types";

export type EventType = Entity<number> &{
    id?: number
    name: string
    description: string
    image: string
    status: boolean
    expanded?: boolean
}