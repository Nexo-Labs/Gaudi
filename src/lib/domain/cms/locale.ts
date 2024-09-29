export type Locale = 'es' | 'en';
export const locales: {
    [k in Locale]: k;
} = {
    es: 'es',
    en: 'en'
} as const;
