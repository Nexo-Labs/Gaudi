type Locale = 'es' | 'en'
export const locales: {
    [k in Locale]: k;
} = {
    es: 'es',
    en: 'en'
} as const;

type Permission = 'basic' | 'premium' | 'admin'
export const permissions: {
    [k in Permission]: k;
} = {
    basic: 'basic',
    premium: 'premium',
    admin: 'admin'
} as const;

export interface ContentCMSId {
    id: string;
}

export interface ContentCMSPermissions {
    permissions: Permission[];
}

export interface ContentCMSLocalized<Payload> {
    localized: Record<Locale, Payload>;   
}

