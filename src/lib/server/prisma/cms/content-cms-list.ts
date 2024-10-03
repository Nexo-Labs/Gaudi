import type { ContentCMSPrismaTyped } from "$src/lib/domain/cms/content-cms.js";
import type { VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
import { notNull } from "$src/lib/domain/common/optional_helpers.js";
import { type ContentCMSType } from "$src/lib/domain/prisma-enum-mapping.js";
import { prismaClient } from "../prisma_client.js";

type ContentCMSMap = {
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

export async function getTotal(
    type: ContentCMSType,
    where?: any
): Promise<number> {
    return await prismaClient.contentCMS.count({
        where: { type, ...where }
    })
}

