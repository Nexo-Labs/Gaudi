import { getUser } from '$src/lib/server/auth.service.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { contentCMSTypes } from '$src/lib/domain/prisma-enum-mapping.js';
import { getContentCMSFromSchema, loadSchemaWithDefault, schema } from '../../../../../lib/domain/cms/video/schema.js';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contentCMSGet, upsertCMSContent } from '$src/lib/server/prisma/cms/content-cms-repository.js';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const type = contentCMSTypes["VIDEO"];
    const id = url.searchParams.get('id');

    const contentCMS = id ? await contentCMSGet(id) : undefined;
	const zodSchema = loadSchemaWithDefault(contentCMS);

	if (!type) return error(404, 'Content type not found');
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	const form = await superValidate(zodSchema);

	return { type, form };
};


export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) return fail(400, { form });

		const contentCMS = getContentCMSFromSchema(form.data);
		await upsertCMSContent("VIDEO", contentCMS);

		return message(form, 'Form posted successfully!');
	}
};

