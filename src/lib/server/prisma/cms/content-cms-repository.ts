import type { ContentCMSPrismaTyped } from "$src/lib/domain/cms/content-cms.js";
import type { VideoContentCMS } from "$src/lib/domain/cms/video/video-content-cms.js";
import { notNull } from "$src/lib/domain/common/optional_helpers.js";
import { type ContentCMSType } from "$src/lib/domain/prisma-enum-mapping.js";
import { prismaClient } from "../prisma_client.js";

export type ContentCMSMap = {
    VIDEO: VideoContentCMS;
    ARTICLE: VideoContentCMS;
    BOOK: VideoContentCMS;
    QUOTE: VideoContentCMS;
    PHOTO: VideoContentCMS;
};

export async function contentCMSList<T extends keyof ContentCMSMap>(
    type: ContentCMSType, 
    page?: number, 
    limit?: number,
    where?: any
): Promise<ContentCMSPrismaTyped<ContentCMSMap[T]>[]> {
    limit = limit ?? 10;
    const skip = notNull(page, page => (page - 1) * limit);
    return await prismaClient.contentCMS.findMany({
        skip,
        take: limit,
        where: { type, ...where },
        orderBy: { updatedAt: 'desc' }
    })
}

export async function upsertCMSContent<T extends keyof ContentCMSMap>(
    type: ContentCMSType, 
    data: ContentCMSMap[T]
): Promise<void> {
    const contentPrismaCMS: ContentCMSPrismaTyped<ContentCMSMap[T]> = {
        id: data.id,
        type: type,
        seeds: data.seeds,
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        data
    };
    await prismaClient.contentCMS.upsert({
        where: { id: data.id },
        update: contentPrismaCMS,
        create: contentPrismaCMS
    })
}

export async function getTotal(
    type: ContentCMSType,
    where?: any
): Promise<number> {
    return await prismaClient.contentCMS.count({
        where: { type, ...where }
    })
}

export async function contentCMSGet<T extends keyof ContentCMSMap>(
    id: string
): Promise<ContentCMSPrismaTyped<ContentCMSMap[T]> | undefined> {
    return await prismaClient.contentCMS.findFirst({
        where: { id }
    })
}

