import type { ContentCMS, ContentCMSLocalized, ContentCMSPermissions } from "../content-cms.js";
import { generateMockImageFileContentCMS, type FileContentCMS } from "../file-content-cms.js";

export type VideoContentCMS = { youtube?: VideoContentLinkCMS; vimeo?: VideoContentLinkCMS }
  & ContentCMS
  & ContentCMSLocalized<VideoContentCMSLocalized>
  & { __typename: 'VideoContentCMS' };

export interface VideoContentCMSLocalized {
    title: string;
    description: string;
    thumbnail: FileContentCMS;
}

export interface VideoLinkLocalized {
    href: string;
}

export interface VideoContentLinkCMS extends ContentCMSPermissions, ContentCMSLocalized<VideoLinkLocalized> {
    type: 'youtube' | 'vimeo';
}

export function videoMock(id: string): VideoContentCMS {
    return {
        id,
        __typename: 'VideoContentCMS',
        seeds: [],
        localized: {
            defaultLocale: 'es',
            default: {
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
                defaultLocale: 'es',
                default: {
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
                defaultLocale: 'es',
                default: {
                    href: 'href'
                },
                en: {
                    href: 'href'
                }
            }
        }
    }
}