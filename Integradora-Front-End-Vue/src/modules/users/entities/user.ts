import { Entity } from "@/kernel/types";

export type User = Entity<number> & {
    id?: number,
    name: string,
    lastname: string,
    surname: string,
    lada: string,
    phone: string,
    status: boolean
}