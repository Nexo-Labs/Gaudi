import type { ContentCMS, ContentCMSLocalized, ContentCMSPermissions } from "./content-cms.js";

export interface FileContentCMS extends ContentCMS, ContentCMSPermissions {
    filetype: 'pdf' | 'png'
    provider: 'local' | 's3'
    restrictions: string[]
    title: string
    description: string
}

export function generateMockImageFileContentCMS(): FileContentCMS {
    return {
        id: 'id',
        seeds: [],
        filetype: 'png',
        provider: 'local',
        permissions: [],
        restrictions: ['basic'],
        title: 'title',
        description: 'description'
    }
}