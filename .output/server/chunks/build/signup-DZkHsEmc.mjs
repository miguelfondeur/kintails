import { ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-CKQ8h17k.mjs';
import { u as useSupabaseUser, a as useRouter } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    watch(user, (newUser) => {
      if (newUser) {
        router.push("/stories");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 px-4" }, _attrs))}><div class="max-w-md w-full"><div class="text-center mb-8"><img src="https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&amp;hair=balding&amp;body=checkered&amp;nose=wrinkles&amp;eyes=glasses&amp;mouth=bigSmile&amp;facialHair=walrus&amp;hairColor=dee1f5&amp;clothingColor=f3b63a&amp;backgroundColor=bde4a7&amp;facialHairProbability=100&amp;radius=50" alt="Kintales" class="w-20 h-20 mx-auto rounded-full shadow-lg mb-4"><h1 class="text-3xl font-bold text-gray-900">Create Account</h1><p class="text-gray-600 mt-2">Start sharing your family stories</p></div><div class="bg-white p-8 rounded-xl shadow-xl"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input${ssrRenderAttr("value", unref(email))} type="email" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Password</label><input${ssrRenderAttr("value", unref(password))} type="password" required minlength="6" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"></div>`);
      if (unref(error)) {
        _push(`<div class="p-4 bg-red-50 text-red-600 rounded-lg text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50">${ssrInterpolate(unref(loading) ? "Creating account..." : "Create Account")}</button><button type="button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center gap-2"><img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5"> Sign up with Google </button></form><div class="mt-6 text-center text-sm"><p class="text-gray-600"> Already have an account? </p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-DZkHsEmc.mjs.map
