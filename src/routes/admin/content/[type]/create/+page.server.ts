import { getUser } from '$src/lib/server/auth.service.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { contentCMSGet } from '$src/lib/server/prisma/cms/content-cms-repository.js';
import { contentCMSTypes } from '$src/lib/domain/prisma-enum-mapping.js';

export const load: PageServerLoad = async ({ locals, params }) => {
	const type = contentCMSTypes[params.type.toUpperCase() as keyof typeof contentCMSTypes];
	if (!type) return error(404, 'Content type not found');
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
    
	return { type };
};
