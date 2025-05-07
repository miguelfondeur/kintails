import { _ as __nuxt_component_0 } from './nuxt-link-GA6KQukH.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-vue-next';
import { u as useStories } from './useStories-BWLmmMzV.mjs';
import { b as useRoute, a as useRouter } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './useSupabaseClient-BMmqXcE2.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const { stories, isLoading } = useStories();
    const currentId = computed(() => Number(route.params.id));
    const story = computed(() => {
      return stories.value.find((s) => s.id === currentId.value);
    });
    const currentIndex = computed(() => {
      return stories.value.findIndex((s) => s.id === currentId.value);
    });
    const previousStoryId = computed(() => {
      if (currentIndex.value > 0) {
        return stories.value[currentIndex.value - 1].id;
      }
      return null;
    });
    const nextStoryId = computed(() => {
      if (currentIndex.value < stories.value.length - 1) {
        return stories.value[currentIndex.value + 1].id;
      }
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8" }, _attrs))}><div class="max-w-4xl mx-auto px-4">`);
      if (unref(isLoading)) {
        _push(`<div class="flex justify-center items-center min-h-[50vh]"><div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div></div>`);
      } else if (unref(story)) {
        _push(`<div class="${ssrRenderClass([unref(story).backgroundColor, "rounded-2xl shadow-xl overflow-hidden"])}"><div class="relative p-8"><div class="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">`);
        if (unref(previousStoryId) !== null) {
          _push(`<button class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all transform hover:scale-105 pointer-events-auto" title="Previous story">`);
          _push(ssrRenderComponent(unref(ChevronLeft), { class: "h-6 w-6 text-gray-700" }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(nextStoryId) !== null) {
          _push(`<button class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all transform hover:scale-105 pointer-events-auto" title="Next story">`);
          _push(ssrRenderComponent(unref(ChevronRight), { class: "h-6 w-6 text-gray-700" }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/stories",
          class: "absolute top-4 right-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Back to Stories `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                createTextVNode(" Back to Stories ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center mb-6"><img${ssrRenderAttr("src", unref(story).avatarUrl)}${ssrRenderAttr("alt", unref(story).familyMember)} class="w-24 h-24 rounded-full mr-6 border-4 border-white shadow-lg"><div><h1 class="text-3xl font-bold text-gray-900 mb-1">${ssrInterpolate(unref(story).familyMember)}</h1><p class="text-gray-600">Written by ${ssrInterpolate(unref(story).author)}</p></div></div><h2 class="text-2xl font-semibold text-gray-900 mb-4">${ssrInterpolate(unref(story).title)}</h2><p class="text-gray-700 whitespace-pre-line text-lg leading-relaxed">${ssrInterpolate(unref(story).content)}</p></div></div>`);
      } else {
        _push(`<div class="text-center py-12"><h2 class="text-2xl font-semibold text-gray-600">Story not found</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/stories",
          class: "inline-flex items-center mt-4 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Back to Stories `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                createTextVNode(" Back to Stories ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stories/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-qaWcuvm1.mjs.map
