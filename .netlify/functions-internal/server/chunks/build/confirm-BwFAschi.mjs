import { defineComponent, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    const router = useRouter();
    watch(user, (newUser) => {
      if (newUser) {
        router.push("/stories");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50" }, _attrs))}><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4"></div><p class="text-gray-600">Completing authentication...</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirm-BwFAschi.mjs.map
