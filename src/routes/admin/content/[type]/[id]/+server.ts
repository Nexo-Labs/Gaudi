import { json, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { restrictAuth } from '$src/lib/server/auth.service.js';

const prisma = new PrismaClient();

export const DELETE = async ({ locals, params }) => {
	const user = await restrictAuth(locals);
    const { id } = params;

    if (!user) return redirect(303, '/');

    await prisma.contentCMS.delete({
        where: { id }
    });
    return json({ success: true });
};
