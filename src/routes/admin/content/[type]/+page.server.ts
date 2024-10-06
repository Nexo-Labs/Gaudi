import { getUser } from '$src/lib/server/auth.service.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { getTotal, contentCMSList } from '$src/lib/server/prisma/cms/content-cms-repository.js';
import { notNull } from '$src/lib/domain/common/optional_helpers.js';
import { contentCMSTypes, type ContentCMSType } from '$src/lib/domain/prisma-enum-mapping.js';
import type { ContentCMS, ContentCMSPrismaTyped } from '$src/lib/domain/cms/content-cms.js';
import type { VideoContentCMS } from '$src/lib/domain/cms/video/video-content-cms.js';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const type = contentCMSTypes[params.type.toUpperCase() as keyof typeof contentCMSTypes];
	if (!type) return error(404, 'Content type not found');
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	
    const page = notNull(url.searchParams.get('page'), page => Number(page));
    const limit = notNull(url.searchParams.get('limit'), limit => Number(limit));
	
	const [itemsList, totalVideos] = await Promise.all([
		contentCMSList(type , page, limit),
		getTotal(type)
	]);
	
	return {
		header: getHeaders(type),
		type,
		items: itemsList.mapNotNull((content) => getValue(content)),
		totalVideos
	};
};


export type ContentCMSTableRow = {
	id: string;
	title: string;
	seeds: string;
	createdAt: Date;
	updatedAt: Date;
	additionalRows: string[];
}

function getHeaders(type: ContentCMSType): string[] {
	if(type === contentCMSTypes.VIDEO) {
	}
	return ["Título", "Semillas"]
}

function getValue(content: ContentCMSPrismaTyped<ContentCMS>): ContentCMSTableRow | undefined {
	return {
		id: content.id,
		title: getTitle(content),
		seeds: content.seeds.join(", "),
		createdAt: content.createdAt,
		updatedAt: content.updatedAt,
		additionalRows: getAdditionalRows(content)
	};
}

function getTitle(content: ContentCMSPrismaTyped<ContentCMS>): string {
	if(content.type === contentCMSTypes.VIDEO) {
		const video = content as unknown as ContentCMSPrismaTyped<VideoContentCMS>;
		return video.data.localized.default.title;
	}
	return "Error loading title";
}

function getAdditionalRows(content: ContentCMSPrismaTyped<ContentCMS>): string[] {
	if(content.type === contentCMSTypes.VIDEO) {
		const video = content as unknown as ContentCMSPrismaTyped<VideoContentCMS>;

	}
	return [];
}