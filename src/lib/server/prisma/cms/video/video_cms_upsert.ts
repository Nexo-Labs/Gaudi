import { updated } from "$app/stores";
import type { VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
import { contentCMSTypes } from "$src/lib/domain/prisma-enum-mapping.js";
import { prismaClient } from "../../prisma_client.js";

export async function videoCmsUpsert(video: VideoContentCMS) {
    const permissions = (video.youtube?.permissions || video.vimeo?.permissions) ?? [];

    await prismaClient.contentCMS.upsert({
        where: { id: video.id },
        update: {
            data: video,
            seeds: video.seeds,
            permissions: permissions,
            type: contentCMSTypes.VIDEO
        },
        create: {
            id: video.id,
            data: video,
            seeds: video.seeds,
            permissions: permissions,
            type: contentCMSTypes.VIDEO
        }    
    })
}