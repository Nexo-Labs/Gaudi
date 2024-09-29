import type { ContentCMSId, ContentCMSLocalized, ContentCMSPermissions } from "./content-cms.js";

type VideoContentCMS = (
    | { youtube: VideoContentLinkCMS; vimeo?: VideoContentLinkCMS }
    | { vimeo: VideoContentLinkCMS; youtube?: VideoContentLinkCMS }
) & ContentCMSId
  & ContentCMSLocalized<VideoContentCMSLocalized>
  & { __typename: 'VideoContentCMS' };

interface VideoContentCMSLocalized {
    title: string;
    description: string;
    thumbnail: string;
}

interface VideoLinkLocalized {
    href: string;
}

interface VideoContentLinkCMS extends ContentCMSPermissions, ContentCMSLocalized<VideoLinkLocalized> {
    type: 'youtube' | 'vimeo';
}

const MOCK: VideoContentCMS = {
    id: 'id',
    __typename: 'VideoContentCMS',
    localized: {
        es: {
            title: 'Hola',
            description: 'Hola',
            thumbnail: 'Hola'
        },
        en: {
            title: 'Hello',
            description: 'Hello',
            thumbnail: 'Hello'
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