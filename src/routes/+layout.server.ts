import { flatMap } from "$src/lib/domain/common/Optional.js";
import { mapSessionToUserModel } from "$src/lib/domain/user-model.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth();
  const user = flatMap(session, session => mapSessionToUserModel(session))

  return {
    user,
  };
};