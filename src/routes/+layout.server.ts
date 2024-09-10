import { getUser } from "$src/lib/server/auth.service.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async (event) => {
  return {
    user: await getUser(event.locals),
  };
};