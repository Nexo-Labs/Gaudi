import type { ContentCMS, ContentCMSLocalized, ContentCMSPermissions } from "./content-cms.js";
import { generateMockImageFileContentCMS, type FileContentCMS } from "./file-content-cms.js";

export type VideoContentCMS = (
    | { youtube: VideoContentLinkCMS; vimeo?: VideoContentLinkCMS }
    | { vimeo: VideoContentLinkCMS; youtube?: VideoContentLinkCMS }
) & ContentCMS
  & ContentCMSLocalized<VideoContentCMSLocalized>
  & { __typename: 'VideoContentCMS' };

interface VideoContentCMSLocalized {
    title: string;
    description: string;
    thumbnail: FileContentCMS;
}

interface VideoLinkLocalized {
    href: string;
}

interface VideoContentLinkCMS extends ContentCMSPermissions, ContentCMSLocalized<VideoLinkLocalized> {
    type: 'youtube' | 'vimeo';
}

export const videoMock: VideoContentCMS = {
    id: 'id1',
    __typename: 'VideoContentCMS',
    seeds: [],
    localized: {
        es: {
            title: 'Hola',
            description: 'Hola',
            thumbnail: generateMockImageFileContentCMS()
        },
        en: {
            title: 'Hello',
            description: 'Hello',
            thumbnail: generateMockImageFileContentCMS()
        }
    },
    youtube: {
        type: 'youtube',
        permissions: ['basic'],
        localized: {
            es: {
                href: 'href'
            },
            en: {
                href: 'href'
            }
        }
    },
    vimeo: {
        type: 'youtube',
        permissions: ['premium'],
        localized: {
            es: {
                href: 'href'
            },
            en: {
                href: 'href'
            }
        }
    }
}