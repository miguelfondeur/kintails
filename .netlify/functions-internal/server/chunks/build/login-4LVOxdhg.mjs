import { _ as __nuxt_component_0 } from './nuxt-link-GA6KQukH.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-BMmqXcE2.mjs';
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
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 px-4" }, _attrs))}><div class="max-w-md w-full"><div class="text-center mb-8"><img src="https://api.dicebear.com/7.x/personas/svg?seed=kintales&amp;backgroundColor=b9e6fe" alt="Kintales" class="w-20 h-20 mx-auto rounded-full shadow-lg mb-4"><h1 class="text-3xl font-bold text-gray-900">Welcome Back!</h1><p class="text-gray-600 mt-2">Sign in to continue sharing stories</p></div><div class="bg-white p-8 rounded-xl shadow-xl"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input${ssrRenderAttr("value", unref(email))} type="email" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Password</label><input${ssrRenderAttr("value", unref(password))} type="password" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"></div>`);
      if (unref(error)) {
        _push(`<div class="p-4 bg-red-50 text-red-600 rounded-lg text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50">${ssrInterpolate(unref(loading) ? "Signing in..." : "Sign In")}</button><button type="button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center gap-2"><img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5"> Sign in with Google </button></form><div class="mt-6 text-center text-sm"><p class="text-gray-600"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-sky-600 hover:text-sky-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-4LVOxdhg.mjs.map
