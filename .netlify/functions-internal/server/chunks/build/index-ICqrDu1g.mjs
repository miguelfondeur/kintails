import { _ as __nuxt_component_0 } from './nuxt-link-GA6KQukH.mjs';
import { defineComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { BookOpen, Wand2, PenLine, UserCircle, Sparkles, Heart } from 'lucide-vue-next';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ce46cea1><section class="relative py-20 px-4 overflow-hidden bg-sky-100" data-v-ce46cea1><div class="absolute inset-0 -z-10 pattern-background opacity-30" data-v-ce46cea1></div><div class="max-w-4xl mx-auto text-center" data-v-ce46cea1><div class="relative mb-8 inline-block" data-v-ce46cea1><img src="https://api.dicebear.com/7.x/personas/svg?seed=kintales&amp;backgroundColor=b9e6fe" alt="Kintales" class="w-32 h-32 mx-auto rounded-full shadow-xl animate-float" data-v-ce46cea1></div><h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight" data-v-ce46cea1> Welcome to KinTales <span class="inline-block animate-wave" data-v-ce46cea1>\u{1F44B}</span></h1><p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto" data-v-ce46cea1> Create silly stories, share family memories, and have fun with storytelling! </p><div class="flex flex-wrap justify-center gap-4" data-v-ce46cea1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-sky-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BookOpen), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Browse Stories `);
          } else {
            return [
              createVNode(unref(BookOpen), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Browse Stories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/generate",
        class: "inline-flex items-center px-6 py-3 text-lg font-medium bg-purple-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Wand2), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Generate Story `);
          } else {
            return [
              createVNode(unref(Wand2), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Generate Story ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-20 bg-white" data-v-ce46cea1><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-ce46cea1><h2 class="text-3xl font-bold text-center text-gray-900 mb-12" data-v-ce46cea1> Create Magical Stories </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-ce46cea1><div class="bg-rose-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-v-ce46cea1><div class="w-14 h-14 bg-rose-200 rounded-xl flex items-center justify-center mb-6" data-v-ce46cea1>`);
      _push(ssrRenderComponent(unref(PenLine), { class: "h-7 w-7 text-rose-600" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-ce46cea1>Write Stories</h3><p class="text-gray-600" data-v-ce46cea1> Share your family&#39;s adventures, from epic tales to silly moments! </p></div><div class="bg-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-v-ce46cea1><div class="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center mb-6" data-v-ce46cea1>`);
      _push(ssrRenderComponent(unref(UserCircle), { class: "h-7 w-7 text-purple-600" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-ce46cea1>Create Characters</h3><p class="text-gray-600" data-v-ce46cea1> Design fun avatars for your family with our character creator! </p></div><div class="bg-amber-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-v-ce46cea1><div class="w-14 h-14 bg-amber-200 rounded-xl flex items-center justify-center mb-6" data-v-ce46cea1>`);
      _push(ssrRenderComponent(unref(Sparkles), { class: "h-7 w-7 text-amber-600" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-ce46cea1>Generate Fun</h3><p class="text-gray-600" data-v-ce46cea1> Let our story generator create wacky tales about your loved ones! </p></div></div></div></section><section class="py-20 bg-sky-100" data-v-ce46cea1><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-ce46cea1><h2 class="text-3xl font-bold text-gray-900 mb-12" data-v-ce46cea1> Meet Some Characters </h2><div class="flex flex-wrap justify-center gap-8" data-v-ce46cea1><!--[-->`);
      ssrRenderList(["grandpa", "mom", "dad", "sister", "brother"], (seed) => {
        _push(`<div class="group relative" data-v-ce46cea1><img${ssrRenderAttr("src", `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=b9e6fe`)}${ssrRenderAttr("alt", seed)} class="w-24 h-24 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300" data-v-ce46cea1></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-purple-100" data-v-ce46cea1><div class="max-w-3xl mx-auto px-4 text-center" data-v-ce46cea1><h2 class="text-3xl font-bold text-gray-900 mb-6" data-v-ce46cea1> Start Your Family&#39;s Story Today </h2><p class="text-xl text-gray-600 mb-8" data-v-ce46cea1> Join thousands of families creating memories and having fun together! </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-purple-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Heart), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Create Your First Story `);
          } else {
            return [
              createVNode(unref(Heart), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Create Your First Story ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce46cea1"]]);

export { index as default };
//# sourceMappingURL=index-ICqrDu1g.mjs.map
