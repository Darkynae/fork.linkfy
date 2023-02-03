import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions: Actions = {
  login: async({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { error: err } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: err.message
        });
      }
      return fail(500, {
        message: err.message
      });
    }

    throw redirect(303, "/");
  }
};