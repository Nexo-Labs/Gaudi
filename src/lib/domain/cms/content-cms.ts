import type { Locale } from "./locale.js";
import type { Permission } from "./permission.js";

export interface ContentCMSId {
    id: string;
}

export interface ContentCMSPermissions {
    permissions: Permission[];
}

export interface ContentCMSLocalized<Payload> {
    localized: Record<Locale, Payload>;   
}

