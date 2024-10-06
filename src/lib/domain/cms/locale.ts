export type Locales = 'es' | 'en';

export const locales: {
    [k in Locales]: k;
} = {
    es: 'es',
    en: 'en'
} as const;
