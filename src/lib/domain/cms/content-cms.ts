import type { Locale } from "./locale.js";
import type { Permission } from "./permission.js";
import type { ContentCMS as ContentCMSPrisma } from "@prisma/client";

export interface ContentCMS {
    id: string;
    seeds: string[];
}

export interface ContentCMSPermissions {
    permissions: Permission[];
}

export interface ContentCMSLocalized<Payload> {
    localized: Record<Locale, Payload>;   
}


export type ContentCMSPrismaTyped<T> = Omit<ContentCMSPrisma, 'data'> & {
    data: T;
};
