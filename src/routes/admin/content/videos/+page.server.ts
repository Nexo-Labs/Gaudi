import { getUser } from '$src/lib/server/auth.service.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { videoCmsList } from '$src/lib/server/cms/video/video-cms-list.js';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');

	return {
		videos: await videoCmsList()
	};
};
