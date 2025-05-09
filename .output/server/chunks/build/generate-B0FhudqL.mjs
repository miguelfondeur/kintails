import { _ as __nuxt_component_0 } from './nuxt-link-Du4lMCKR.mjs';
import { b as __nuxt_component_1$1 } from './server.mjs';
import { mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { ArrowLeft } from 'lucide-vue-next';
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
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" }, _attrs))}><header class="py-4"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"><h1 class="text-3xl font-bold text-gray-900">Story Generator</h1><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Back to Stories `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Back to Stories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-xl p-6 min-h-[400px] flex items-center justify-center"${_scopeId}><div class="text-center"${_scopeId}><div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4"${_scopeId}></div><p class="text-gray-600"${_scopeId}>Loading story generator...</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-xl p-6 min-h-[400px] flex items-center justify-center" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4" }),
                  createVNode("p", { class: "text-gray-600" }, "Loading story generator...")
                ])
              ])
            ];
          }
        })
      }, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/generate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=generate-B0FhudqL.mjs.map
