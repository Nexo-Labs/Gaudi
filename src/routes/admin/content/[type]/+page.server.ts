import { getUser } from '$src/lib/server/auth.service.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { getTotal, contentCMSList } from '$src/lib/server/prisma/cms/content-cms-list.js';
import { notNull } from '$src/lib/domain/common/optional_helpers.js';
import { contentCMSTypes } from '$src/lib/domain/prisma-enum-mapping.js';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const type = contentCMSTypes[params.type.toUpperCase() as keyof typeof contentCMSTypes];
	if (!type) return error(404, 'Content type not found');
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	
    const page = notNull(url.searchParams.get('page'), page => Number(page));
    const limit = notNull(url.searchParams.get('limit'), limit => Number(limit));
	
	const [videos, totalVideos] = await Promise.all([
		contentCMSList(type , page, limit),
		getTotal(type)
	]);
	
	return {
		videos,
		totalVideos
	};
};
