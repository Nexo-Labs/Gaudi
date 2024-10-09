export type Permission = 'basic' | 'premium' | 'admin';
export const permissions: {
    [k in Permission]: k;
} = {
    basic: 'basic',
    premium: 'premium',
    admin: 'admin'
} as const;
