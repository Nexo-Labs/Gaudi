import { videoMock } from '$lib/domain/cms/video/video-content-cms.js';
import { videoCmsUpsert } from '$lib/server/prisma/cms/video/video_cms_upsert.js';
import { syncProducts } from '$lib/server/stripe/products/sync_products.js';

await syncProducts();

/*
//make a for from 1 to 100 to create 100 videos
for (let i = 0; i < 100; i++) {
    await videoCmsUpsert(videoMock(`${i}`));
}
    */
