import type { ContentCMSPrismaTyped } from "$src/lib/domain/cms/content-cms.js";
import type { VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
import { contentCMSTypes } from "$src/lib/domain/prisma-enum-mapping.js";
import { prismaClient } from "../../prisma/prisma_client.js";

export async function videoCmsList(skip?: number, pageSize?: number): Promise<ContentCMSPrismaTyped<VideoContentCMS>[]> {
    return await prismaClient.contentCMS.findMany({
        skit: skip,
        take: pageSize,
        where: { type: contentCMSTypes.VIDEO },
        orderBy: { updatedAt: 'desc' }
    })
}