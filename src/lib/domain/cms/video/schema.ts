import { z } from 'zod';
import type { ContentCMSPrismaTyped } from '../content-cms.js';
import type { VideoContentCMS, VideoContentCMSLocalized } from './video-content-cms.js';
import type { Infer, InferIn } from 'sveltekit-superforms';
import { zod, type ValidationAdapter } from 'sveltekit-superforms/adapters';
import type { T } from 'vitest/dist/reporters-yx5ZTtEV.js';
import { generateMockImageFileContentCMS } from '../file-content-cms.js';

const VideoLinkLocalizedSchema = z.object({
   href: z.string().url(),
});

const ContentCMSPermissionsSchema = z.enum(["basic", "premium"]);

const VideoContentCMSLocalizedSchema = z.object({
   title: z.string(),
   description: z.string(),
   thumbnail: z
      .instanceof(File, { message: 'Por favor, sube un fichero' })
});

const VideoContentLinkCMSSchema = z.object({
   type: z.enum(["youtube", "vimeo"]),
   permissions: z.array(ContentCMSPermissionsSchema),
   localized: z.object({
      default: VideoLinkLocalizedSchema,
      en: VideoLinkLocalizedSchema.optional(),
   }),
});

export const schema = z.object({
   id: z.string().optional(),
   localized: z.object({
      default: VideoContentCMSLocalizedSchema,
      en: VideoContentCMSLocalizedSchema.optional(),
   }),
   youtube: VideoContentLinkCMSSchema.optional(),
   vimeo: VideoContentLinkCMSSchema.optional(),
});

export type VideoContentCMSSchema = typeof schema;

export function loadSchemaWithDefault(contentCMS: ContentCMSPrismaTyped<VideoContentCMS> | undefined): ValidationAdapter<Infer<VideoContentCMSSchema>, InferIn<VideoContentCMSSchema>> {
   let zodSchema = zod(schema);

   if (!contentCMS) return zodSchema;

   zodSchema.defaults.id = contentCMS.id;
   zodSchema.defaults.localized.default.title = contentCMS.data.localized.default.title;
   zodSchema.defaults.localized.default.description = contentCMS.data.localized.default.description;
   zodSchema.defaults.localized.default.thumbnail = undefined as any; //TODO: Load file
   if (zodSchema.defaults.vimeo?.localized.default && contentCMS.data.vimeo?.localized?.default?.href) {
      zodSchema.defaults.vimeo.localized.default.href = contentCMS.data.vimeo.localized.default.href;
   }
   if (zodSchema.defaults.youtube?.localized.default && contentCMS.data.youtube?.localized?.default?.href) {
      zodSchema.defaults.youtube.localized.default.href = contentCMS.data.youtube.localized.default.href;
   }

    return zodSchema;
}

export function getContentCMSFromSchema(schemaData: Infer<VideoContentCMSSchema>): VideoContentCMS {
   const en: VideoContentCMSLocalized | undefined = schemaData.localized.en ? {
      title: schemaData.localized.en.title,
      description: schemaData.localized.en.description,
      thumbnail: generateMockImageFileContentCMS(),
   } : undefined;
   
   return {
      id: schemaData.id ?? "",
      __typename: 'VideoContentCMS',
      seeds: [],
      localized: {
         defaultLocale: 'es',
         default: {
            title: schemaData.localized.default.title,
            description: schemaData.localized.default.description,
            thumbnail: generateMockImageFileContentCMS(),
         },
         en: schemaData.localized.en ? {
            title: schemaData.localized.en.title,
            description: schemaData.localized.en.description,
            thumbnail: generateMockImageFileContentCMS(),
         } : undefined,
      },
      youtube: schemaData.youtube ? {
         type: schemaData.youtube.type,
         permissions: schemaData.youtube.permissions,
         localized: {
            defaultLocale: 'es',
            default: schemaData.youtube.localized.default,
            en: schemaData.youtube.localized.en
         },
      } : undefined,
      vimeo: schemaData.vimeo ? {
         type: schemaData.vimeo.type,
         permissions: schemaData.vimeo.permissions,
         localized: {
            defaultLocale: 'es',
            default: schemaData.vimeo.localized.default,
            en: schemaData.vimeo.localized.en,
         },
      } : undefined,
};
}